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
        var DATE_FORMAT = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
            CARDS_SCHEMA = {
                name: {type: 'string', writable: false},
                description: {type: 'string', defaultValue: '', writable: false},
                score: {type: 'number', defaultValue: null, writable: true},
                team: {type: 'string', defaultValue: null, writable: true},
                status: {type: 'string', defaultValue: 'unassigned', writable: true},
                assignee: {type: 'string', defaultValue: null, writable: true},
                startDate: {type: 'string', defaultValue: null, writable: true},
                endDate: {type: 'string', defaultValue: null, writable: true}
            },
            currentCards = defaultCardsData;

        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentCards, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        this.getCardById = function (id) {
            return _.cloneDeep(_.find(currentCards, {id: id}));
        };

        this.getBlankCard = function () {
            return _.assign({}, CARDS_SCHEMA, function (objectValue, sourceValue) {
                return sourceValue.defaultValue === undefined ? '' : sourceValue.defaultValue;
            });
        };

        function isValidValue(value, key) {
            // make sure that there are no user defined attributes
            if (CARDS_SCHEMA[key] === undefined) {
                console.log('Card Store: unknown key encountered: ', key, ' ( value: ', value, ')');
                return false;
            }
            // make sure that all required fields are provided
            // TODO: improve
            if (!value && CARDS_SCHEMA[key].defaultValue === undefined) {
                console.log('Card Store: key (', key, ') was required but not provided');
                return false;
            }
            // check dates
            if ((key === 'startDate' || key === 'endDate') && typeof value === 'string') {
                if (!DATE_FORMAT.test(value)) {
                    console.log('Card Store: invalid date format:', value, '( must be: YYYY-MM-DD)');
                    return false;
                }
            }
            // check types of values
            if (typeof value !== CARDS_SCHEMA[key].type && value !== CARDS_SCHEMA[key].defaultValue) {
                console.log('Card Store: invalid value encountered:', value, '( key:', key, ')');
                return false;
            }
            return true;
        }

        function isValidCard(card) {
            return _.every(card, isValidValue);
        }

        function isWritableCardData(cardData) {
            return _.every(cardData, function (value, key) {
                return CARDS_SCHEMA[key].writable;
            });
        }

        /**
         *
         * @param {Object} newCardData
         *  {
         *      name: [String],
         *      description: [String] (optional, default: ''),
         *      score: [Number] (optional, default: null),
         *      team: [String] (optional, default: null),
         *      status: [String] (optional, default: 'unassigned'),
         *      assignee: [String] (optional, default: null),
         *      startDate: [String] (optional, format: YYYY-MM-DD, default: null)
         *  }
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
         * @param {Object} newCardData with fields:
         *  {
         *      score: [Number],
         *      team: [String],
         *      status: [String],
         *      assignee: [String],
         *      startDate: [String] (format: YYYY-MM-DD),
         *      endDate: [String] (format: YYYY-MM-DD)
         *  }
         */
        function updateCard(cardId, newCardData) {
            var card = _.find(currentCards, {id: cardId});
            if (card === undefined) {
                console.log('Card Store: attempt to update non existent card (id:', cardId, ')');
                return false;
            }
            if (isValidCard(newCardData) && isWritableCardData(newCardData)) {
                newCardData = _.cloneDeep(newCardData);
                _.forEach(newCardData, function (value, key) {
                    card[key] = newCardData[key];
                });
                return true;
            }
            return false;
        }

        function removeCard(cardId) {
            var card = _.remove(currentCards, {id: cardId});
            if (_.isEmpty(card)) {
                console.log('Card Store: attempt to remove non existent card (id:', cardId, ')');
                return false;
            }
            return true;
        }


        dispatcher.registerAction('UPDATE_CARD', updateCard.bind(this));
        dispatcher.registerAction('ADD_CARD', addCard.bind(this));
        dispatcher.registerAction('REMOVE_CARD', removeCard.bind(this));

        this.testAdd = function () {
            var addedCardIds = [],
                self = this,
                validCards = [
                    { // all data provided
                        name: 'card A',
                        description: 'do something',
                        status: 'finished',
                        score: 30,
                        team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
                        assignee: '0e8b324c-d49a-474d-8a=f4-f93bcc6a1511',
                        startDate: '2015-07-30'
                    },
                    { // minimal info provided
                        name: 'card B'
                    }
                ],
                invalidCards = [
                    { // contains id
                        id: '90eed4aa-40fe-496e-999a-54a436d66427',
                        name: 'card C',
                        description: ''
                    },
                    { // no name
                        description: 'card D'
                    },
                    { // invalid score type
                        name: 'card E',
                        description: '',
                        score: '2'
                    },
                    { // invalid date format
                        name: 'card F',
                        startDate: '2015-0730'
                    },
                    { // user defined attribute
                        name: 'card G',
                        fname: 'V'
                    }
                ];
            console.log('Test addCard...');
            _.forEach(validCards, function (card) {
                var cardId = addCard.call(self, card);
                if (cardId) {
                    addedCardIds.push(cardId);
                }
            });
            _.forEach(invalidCards, function (card) {
                addCard.call(self, card);
            });
            console.log('Test addCard... done\n\n');
            return addedCardIds;
        };
        this.testUpdate = function (cardIds) {
            var self = this,
                validCardData = [
                    { // task finished
                        status: 'finished',
                        score: 30,
                        team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
                        assignee: '0e8b324c-d49a-474d-8a=f4-f93bcc6a1511',
                        startDate: '2015-07-30',
                        endDate: '2015-08-01'
                    },
                    { // task reset
                        status: 'unassigned',
                        score: null,
                        team: null,
                        assignee: 'unassigned',
                        startDate: null,
                        endDate: null
                    }
                ],
                invalidCardData = [
                    { // cannot redefine name
                        name: 'card X'
                    },
                    { // invalid value
                        description: null
                    },
                    { // invalid value
                        description: undefined
                    },
                    { // invalid key
                        id: '90eed4aa-40fe-496e-999a-54a436d66427'
                    },
                    { // invalid key
                        id2: '90eed4aa-40fe-496e-999a-54a436d66427'
                    }
                ];
            cardIds.push('non-existent-id');
            console.log('Test updateCard...');
            _.forEach(cardIds, function (id) {
                _.forEach(validCardData.concat(invalidCardData), function (data) {
                    updateCard.call(self, id, data);
                });
            });
            console.log('Test updateCard... done\n\n');
        };
        this.testRemove = function (cardIds) {
            var self = this;
            console.log('Test removeCard...');
            _.forEach(cardIds, function (id) {
                removeCard.call(self, id);
            });
            removeCard.call(self, 'non-existent-id');
            console.log('Test removeCard... done\n\n');
        };
    }



    return CardsStore;
});