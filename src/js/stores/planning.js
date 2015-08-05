define(
    ['constants'],
    function (constants) {
        'use strict';

        function Planning(dispatcher) {
            this.isAddingCard = false;
            var currentCard = null;
            this.addingCard = function (isAdding, card) {
                this.isAddingCard = isAdding;
                currentCard = card;
            };

            this.getCurrentCard = function () {
                return currentCard;
            };




            dispatcher.registerAction(constants.actionNames.PLANNING_ADD_CARD, this.addingCard.bind(this, true));
            dispatcher.registerAction(constants.actionNames.PLANNING_DONE_ADDING_CARD, this.addingCard.bind(this, false));
            dispatcher.registerAction(constants.actionNames.PLANNING_EDIT_CARD, this.addingCard.bind(this, true));

        }

        return Planning;
    });