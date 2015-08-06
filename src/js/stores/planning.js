define(
    ['constants'],
    function (constants) {
        'use strict';

        function Planning(dispatcher) {
            var IsAddingOrEditingCard = false;
            var currentCard = null;
            this.addingCard = function (isAdding, card) {
                IsAddingOrEditingCard = isAdding;
                currentCard = card;
            };
            this.editCard = function (isAdding, card) {
                IsAddingOrEditingCard = isAdding;
                currentCard = card;
            };

            this.getCurrentCard = function () {
                return currentCard;
            };

            this.getIsAddingOrEditingCard = function () {
                return IsAddingOrEditingCard;
            };


            dispatcher.registerAction(constants.actionNames.PLANNING_ADD_CARD, this.addingCard.bind(this, true));
            dispatcher.registerAction(constants.actionNames.PLANNING_DONE_ADDING_CARD, this.addingCard.bind(this, false));
            dispatcher.registerAction(constants.actionNames.PLANNING_EDIT_CARD, this.editCard.bind(this, true));

        }

        return Planning;
    });