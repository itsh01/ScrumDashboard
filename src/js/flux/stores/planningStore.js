define([
        '../../constants'
    ],

    function (constants) {
        'use strict';

        function Planning(planningPars) {
            var IsAddingOrEditingCard = false;
            var currentCard = null;

            this.emitChange = function () {
                planningPars.eventEmitter.emit(constants.flux.PLANNING_STORE_CHANGE);
            };

            this.addChangeListener = function (callback) {
                planningPars.eventEmitter.on(constants.flux.PLANNING_STORE_CHANGE, callback);
            };

            this.removeChangeListener = function (callback) {
                planningPars.eventEmitter.removeListener(constants.flux.PLANNING_STORE_CHANGE, callback);
            };

            function addingCard(isAdding, card) {
                IsAddingOrEditingCard = isAdding;
                currentCard = card;
            }

            function editCard(isAdding, card) {
                IsAddingOrEditingCard = isAdding;
                currentCard = card;
            }

            this.getCurrentCard = function () {
                return currentCard;
            };

            this.getIsAddingOrEditingCard = function () {
                return IsAddingOrEditingCard;
            };

            this.dispatchToken = planningPars.dispatcher.register(function (payload) {

                var actionName = payload.actionName,
                    data = payload.payload;

                switch (actionName) {
                    case (constants.actionNames.PLANNING_ADD_CARD):
                        addingCard.apply(this, [true].concat(data));
                        break;
                    case (constants.actionNames.PLANNING_DONE_ADDING_CARD):
                        addingCard.apply(this, [false].concat(data));
                        break;
                    case (constants.actionNames.PLANNING_EDIT_CARD):
                        editCard.apply(this, [true].concat(data));
                        break;
                    default:
                        return;
                }

                this.emitChange();

            }.bind(this));

        }

        return Planning;
    });