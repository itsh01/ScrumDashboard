
define(['lodash', '../data/cards'], function (_, defaultCardsData) {

    var filterFunctions = {
        AllCards: null,
        TeamCards: function (id) {
            return {team: id};
        },
        UserCards: function (id) {
            return {member: id}
        },
        NotCompleted: {endDate: null}
    };

    function CardsStore() {
        var currentCards = defaultCardsData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get'+filterFuncName] = function () {
                return _.filter(currentCards, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            }
        }, this);

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