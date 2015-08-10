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

            this.dispatchToken = dispatcher.register(function (action) {

                var actionName = [].shift.apply(arguments),
                    payload = arguments;

                switch (actionName) {
                    case (constants.actionNames.PLANNING_ADD_CARD):
                        addingCard.apply(this, [true].concat.call(payload));
                        break;
                    case (constants.actionNames.PLANNING_DONE_ADDING_CARD):
                        addingCard.apply(this, [false].concat.call(payload));
                        break;
                    case (constants.actionNames.PLANNING_EDIT_CARD):
                        editCard.apply(this, [true].concat.call(payload));
                        break;
                    default:
                        // do nothing
                }
            }.bind(this));

        }

        return Planning;
    });