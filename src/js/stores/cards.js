
define(['lodash', '../data/cards'], function (_, defaultCardsData) {
    'use strict';
    var filterFunctions = {
        AllCards: null,
        TeamCards: function (id) {
            return {team: id};
        },
        UserCards: function (id) {
            return {assignee: id};
        },
        NotCompleted: {endDate: null}
    };

    function CardsStore(dispatcher) {
        var currentCards = defaultCardsData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentCards, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        // This is an example of how to use data mutating functions
        function addCard(newCardData) {
            currentCards.push(newCardData);
        }

        dispatcher.registerAction('ADD_MEMBER', addCard.bind(this));

        this.handleAction = function (actionName, actionData) {
            switch (actionName) {
                case 'ADD_CARD': this.addCard(actionData);
                    break;
            }
        };
    }

    return CardsStore;
});