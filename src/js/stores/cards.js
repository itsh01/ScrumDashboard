define([
        'lodash',
        './helpers',
        '../constants'
    ],
    function (_, helpers, constants) {
        'use strict';
        var filterFunctions = {
            AllCards: null,
            TeamCards: function (id) {
                return {team: id};
            },
            CompanyCards: {team: null},
            UserCards: function (id, teamId) {
                return (teamId) ? {assignee: id, team: teamId} : {assignee: id};
            },
            NotCompleted: {endDate: null}
        };

        function CardsStore(dispatcher, cardsDefaultData) {
            var dataFileVersion = '1',
                CARDS_SCHEMA = {
                    name: {type: 'string'},
                    description: {type: 'string', defaultValue: ''},
                    score: {type: 'number', defaultValue: null},
                    team: {type: 'string', defaultValue: null},
                    status: {type: 'string', defaultValue: 'unassigned'},
                    assignee: {type: 'string', defaultValue: null},
                    startDate: {type: 'string', defaultValue: null},
                    endDate: {type: 'string', defaultValue: null}
                },
                currentCards;

            if (dataFileVersion === localStorage.getItem('cardsVersion')) {
                currentCards = restoreFromLocalStorage();
            } else {
                currentCards = cardsDefaultData;
                saveToLocalStorage();
                localStorage.setItem('cardsVersion', dataFileVersion);
            }


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
                    saveToLocalStorage();
                    return cardWithDefaults.id;
                }
            }

            /**
             * @param {String} cardId
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
                delete newCardData.id;
                if (isValidCard(newCardData)) {
                    var didUpdate = helpers.updateItem(currentCards, cardId, newCardData, 'Card Store');
                    saveToLocalStorage();
                    return didUpdate;
                }
                return false;
            }

            /**
             * @param {String} cardId
             */
            function removeCard(cardId) {
                var card = _.remove(currentCards, {id: cardId});
                saveToLocalStorage();
                if (_.isEmpty(card)) {
                    console.log('Card Store: attempt to remove non existent card (id:', cardId, ')');
                    return false;
                }
                return true;
            }

            function unassignMemberFromCards(memberId) {
                var cards = this.getAllCards();
                currentCards = _.map(cards, function (card) {
                    card.assignee = card.assignee === memberId ? null : card.assignee;
                    card.status = 'unassigned';
                    return card;
                });
            }


            function saveToLocalStorage() {
                helpers.saveToLocalStorage('cards', currentCards);
            }

            function restoreFromLocalStorage() {
                return helpers.restoreFromLocalStorage('cards');
            }

            /*eslint-disable no-unused-vars */
            function removeFromLocalStorage() {
                helpers.removeFromLocalStorage('cards');
            }
            /*eslint-enable no-unused-vars */

            var actions = [
                {name: constants.actionNames.UPDATE_CARD, callback: updateCard},
                {name: constants.actionNames.ADD_CARD, callback: addCard},
                {name: constants.actionNames.REMOVE_CARD, callback: removeCard},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: unassignMemberFromCards}
            ];

            _.forEach(actions, function (action) {
                dispatcher.registerAction(action.name, action.callback.bind(this));
            }.bind(this));


        }

        return CardsStore;
    });