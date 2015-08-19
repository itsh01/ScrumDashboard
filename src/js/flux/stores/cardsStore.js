define([
        '../../../vendor/lodash',
        'flux/helpers',
        '../../constants',
        'Firebase'
    ],
    function (_, helpers, constants, Firebase) {
        'use strict';

        function CardsStore(cardPars) {

            //var dataFileVersion = '1';
            var CARDS_SCHEMA = {
                    name: {type: 'string', defaultValue: 'New Card'},
                    description: {type: 'string', defaultValue: 'Write A Short Description'},
                    score: {type: 'number', defaultValue: '1'},
                    team: {type: 'string', defaultValue: ''},
                    status: {type: 'string', defaultValue: 'unassigned'},
                    assignee: {type: 'string', defaultValue: ''},
                    startDate: {type: 'string', defaultValue: ''},
                    endDate: {type: 'string', defaultValue: ''}
                },
                currentCards = cardPars.defaultCardsData,
                cardsFirebaseRef = new Firebase(cardPars.fireBaseURL);

            (function init() {
                cardsFirebaseRef.on('value', function (snapshot) {
                    currentCards = snapshot.val();
                    cardPars.eventEmitter.emit(constants.flux.CARDS_STORE_CHANGE);
                });

                this.emitChange = function () {
                    cardPars.eventEmitter.emit(constants.flux.CARDS_STORE_CHANGE);
                };

                this.addChangeListener = function (callback) {
                    cardPars.eventEmitter.on(constants.flux.CARDS_STORE_CHANGE, callback);
                };

                this.removeChangeListener = function (callback) {
                    cardPars.eventEmitter.removeListener(constants.flux.CARDS_STORE_CHANGE, callback);
                };

                var filterFunctions = {
                    AllCards: null,
                    TeamCards: function (id) {
                        return {team: id};
                    },
                    CompanyCards: function () {
                        return {team: ''};
                    },
                    UserCards: function (id, teamId) {
                        return (teamId) ? {assignee: id, team: teamId} : {assignee: id};
                    },
                    NotCompleted: {endDate: ''}
                };

                _.forEach(filterFunctions, function (filterVal, filterFuncName) {
                    this['get' + filterFuncName] = function () {
                        return _.filter(currentCards, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
                    };
                }, this);

            }).apply(this);

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

            function updateCard(cardId, newCardData) {
                delete newCardData.id;
                if (isValidCard(newCardData)) {
                    return helpers.updateItem(currentCards, cardId, newCardData, 'Card Store');
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

            function unassignMemberFromCards(memberId) {
                var cards = this.getAllCards();
                currentCards = _.map(cards, function (card) {
                    card.assignee = card.assignee === memberId ? '' : card.assignee;
                    card.status = 'unassigned';
                    return card;
                });
            }

            var actions = [
                {name: constants.actionNames.UPDATE_CARD, callback: updateCard},
                {name: constants.actionNames.ADD_CARD, callback: addCard},
                {name: constants.actionNames.REMOVE_CARD, callback: removeCard},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: unassignMemberFromCards}
            ];

            function getStoresQueue(actionStoreOrder) {
                var storeIndex = _.indexOf(actionStoreOrder, constants.storesName.CARDS_STORE);
                var storeOrder = _.slice(actionStoreOrder, 0, storeIndex);
                return _.map(storeOrder, function (storeName) {
                    return cardPars.waitForTokens[storeName];
                });
            }

            cardPars.waitForTokens[constants.storesName.CARDS_STORE] = cardPars.dispatcher.register(function (payload) {
                var actionName = payload.actionName,
                    data = payload.payload,

                    action = _.find(actions, {name: actionName});

                if (action) {
                    var actionStoreOrder = payload.storeOrder;
                    if (actionStoreOrder && actionStoreOrder.length > 1) {
                        cardPars.dispatcher.waitFor(getStoresQueue(actionStoreOrder));
                    }
                    action.callback.apply(this, data);
                    saveToFirebase();
                    this.emitChange();
                }
            }.bind(this));

            function saveToFirebase() {
                cardsFirebaseRef.set(currentCards);
            }
        }

        return CardsStore;

    });

