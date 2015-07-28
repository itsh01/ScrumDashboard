
define(['lodash', '../data/cards'], function (_, defaultCardsData) {

    function CardsStore() {
        var currentCards = defaultCardsData;
        this.getAllCards = function () {
            return _.cloneDeep(currentCards);
        };

        // This is an example of how to use data mutating functions
        this.addCard = function (newCardData) {
            currentCards.push(newCardData);
        };

        this.handleAction = function(actionName, actionData) {
            switch (actionName) {
                case 'ADD_CARD': this.addCard(actionData);
                    break;
            }
        }
    }


    return CardsStore;
});