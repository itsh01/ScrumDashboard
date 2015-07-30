define(['lodash', '../data/cards', '../helpers/helpers'], function (_, defaultCardsData, helpers) {
    'use strict';
    var filterFunctions = {
        AllCards: null,
        TeamCards: function (id) {
            return {team: id};
        },
        UserCards: function (id, teamId) {
            return (teamId) ? {assignee: id, team: teamId} : {assignee: id};
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

        var cardSchema = {
            name: {type: 'string', defaultValue: 'New Card'},
            description: {type: 'string', defaultValue: ''},
            score: {type: 'number', defaultValue: null},
            team: {type: 'string', defaultValue: null},
            status: {type: 'string', defaultValue: 'unassigned'},
            assignee: {type: 'string', defaultValue: null},
            startDate: {type: 'string', defaultValue: null},
            endDate: {type: 'string', defaultValue: null}
        };

        this.getBlankCard = function () {
            return _.assign({}, cardSchema, function (objectValue, sourceValue) {
                return sourceValue.defaultValue === undefined ? '' : sourceValue.defaultValue;
            });
        };

        function isValidValue(value, key) {
            // make sure that all required fields are provided
            if (!value && cardSchema[key].defaultValue !== undefined) {
                console.log('Card Store: key(', key, ') was required but not provided');
                return false;
            } else if (typeof value !== cardSchema[key].type && value !== cardSchema[key].defaultValue) {
                console.log('Card Store: invalid value encountered: ', value, ' (key: ', key, ')');
                return false;
            }
            return true;
        }

        function isValidCard(card) {
            return _.every(card, isValidValue);
        }

        /**
         *
         * @param {Object} newCardData (
         *  name: [String],
         *  description: [String] (optional, default: ''),
         *  score: [Number] (optional, default: null),
         *  team: [String] (optional, default: null),
         *  assignee: [String] (optional, default: null),
         *  startDate: [String] (optional, format: YYYY-MM-DD, default: null)
         *  )
         */
        function addCard(newCardData) {
            var blankCard = this.getBlankCard(),
                cardWithDefaults = _.assign(blankCard, newCardData);
            if (isValidCard(cardWithDefaults)) {
                cardWithDefaults.id = helpers.generateGuid();
                cardWithDefaults.status = cardWithDefaults.status || 'unassigned';
                currentCards.push(cardWithDefaults);
                return cardWithDefaults.id;
            }
        }

        /**
         *
         * @param {Object} newCardData (
         *  name: [String],
         *  description: [String] (optional, default: ''),
         *  score: [Number] (optional, default: null),
         *  team: [String] (optional, default: null),
         *  assignee: [String] (optional, default: null),
         *  startDate: [String] (optional, format: YYYY-MM-DD, default: null)
         *  )
         */
        //function updateCard(cardId, newCardData) {
        //    if (isValidCard(newCardData)) {
        //        newCardData = JSON.parse(JSON.stringify(newCardData));
        //        newCardData.id = dispatcher.generateGuid();
        //        currentCards.push(newCardData);
        //        return newCardData.id;
        //    }
        //}

        //dispatcher.registerAction('UPDATE_MEMBER', updateCard.bind(this));
        dispatcher.registerAction('ADD_CARD', addCard.bind(this));
    }

    return CardsStore;
});