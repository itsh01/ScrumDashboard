define(
    ['constants'],
    function (constants) {
        'use strict';

        function Planning(dispatcher) {
            this.isAddingCard = false;
            this.addingCard = function (isAdding) {
                this.isAddingCard = isAdding;
            };


            dispatcher.registerAction(constants.actionNames.PLANNING_ADD_CARD, this.addingCard.bind(this, true));
            dispatcher.registerAction(constants.actionNames.PLANNING_DONE_ADDING_CARD, this.addingCard.bind(this, false));

        }

        return Planning;
    });