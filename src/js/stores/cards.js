
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

        this.getCardById = function (id) {
            return _.cloneDeep(_.find(currentCards, {id: id}));
        };

        function addCard(newCardData) {
            currentCards.push(newCardData);
        }

        dispatcher.registerAction('ADD_MEMBER', addCard.bind(this));
    }

    return CardsStore;
});