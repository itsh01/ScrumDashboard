define([
        '../../../constants'
    ],

    function (constants) {
        'use strict';

        function Planning(dispatcher) {
            var IsAddingOrEditingCard = false;
            var currentCard = null;

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

            this.dispatchToken = dispatcher.register(function (payload) {

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
                        // do nothing
                }
            }.bind(this));

        }

        return Planning;
    });