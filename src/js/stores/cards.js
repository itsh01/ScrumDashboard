define(['lodash',
        '../data/cards',
        './helpers',
        './actionNames'
    ],
    function (_, defaultCardsData, helpers, actionNames) {
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
            var CARDS_SCHEMA = {
                    name: {type: 'string'},
                    description: {type: 'string', defaultValue: ''},
                    score: {type: 'number', defaultValue: null},
                    team: {type: 'string', defaultValue: null},
                    status: {type: 'string', defaultValue: 'unassigned'},
                    assignee: {type: 'string', defaultValue: null},
                    startDate: {type: 'string', defaultValue: null},
                    endDate: {type: 'string', defaultValue: null}
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
                return helpers.getBlankItem(CARDS_SCHEMA);
            };


            function isValidCard(card) {
                return _.every(card, function (value, key) {
                    return helpers.isValidValue(value, key, CARDS_SCHEMA, 'Card Store');
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
             * @param {Object} newCardData
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
                if (isValidCard(newCardData)) {
                    return helpers.updateItem(currentCards, cardId, newCardData, 'Card Store');
                    // TODO: if assignee or team provided then make sure that they exist
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

            dispatcher.registerAction(actionNames.UPDATE_CARD, updateCard.bind(this));
            dispatcher.registerAction(actionNames.ADD_CARD, addCard.bind(this));
            dispatcher.registerAction(actionNames.REMOVE_CARD, removeCard.bind(this));

        }

        return CardsStore;
    });