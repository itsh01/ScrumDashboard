define([
        '../../../vendor/lodash',
        'flux/helpers',
        '../../constants',
        'Firebase'
    ],
    function (_, helpers, constants, Firebase) {
        'use strict';


        function CardsStore(dispatcher, eventEmitter, waitForTokens, defaultCardsData) {

            var dataFileVersion = '1',
                CARDS_SCHEMA = {
                    name: {type: 'string'},
                    description: {type: 'string'},
                    score: {type: 'number'},
                    team: {type: 'string'},
                    status: {type: 'string', defaultValue: 'unassigned'},
                    assignee: {type: 'string'},
                    startDate: {type: 'string'},
                    endDate: {type: 'string'}
                },
                currentCards = defaultCardsData,
                cardsFirebaseRef = new Firebase("https://scrum-dashboard-1.firebaseio.com/cards");

            (function init() {
                this.emitChange = function () {
                    eventEmitter.emit(constants.flux.CARDS_STORE_CHANGE);
                };

                this.addChangeListener = function (callback) {
                    eventEmitter.on(constants.flux.CARDS_STORE_CHANGE, callback);
                };

                this.removeChangeListener = function (callback) {
                    eventEmitter.removeListener(constants.flux.CARDS_STORE_CHANGE, callback);
                };

                if (dataFileVersion === localStorage.getItem('cardsVersion')) {
                    currentCards = restoreFromLocalStorage();
                } else {
                    currentCards = defaultCardsData;
                    saveToLocalStorage();
                    localStorage.setItem('cardsVersion', dataFileVersion);
                }

                var filterFunctions = {
                    //AllCards: null,
                    TeamCards: function (id) {
                        return {team: id};
                    },
                    //CompanyCards: function () {
                    //    return {team: null};
                    //},
                    UserCards: function (id, teamId) {
                        return (teamId) ? {assignee: id, team: teamId} : {assignee: id};
                    }
                    //NotCompleted: {endDate: null}
                };

                _.forEach(filterFunctions, function (filterVal, filterFuncName) {
                    this['get' + filterFuncName] = function () {
                        return _.filter(currentCards, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
                    };
                }, this);

            }).apply(this);

            function updateCurrentCards() {
                cardsFirebaseRef.on("value", function (snapshot) {
                    currentCards = snapshot.val();
                });
            }

            updateCurrentCards();

            cardsFirebaseRef.on("child_changed", function (snapshot) {
                updateCurrentCards();
            });

            cardsFirebaseRef.on("child_added", function (snapshot, prevChildKey) {
                updateCurrentCards();
            });

            cardsFirebaseRef.on("child_removed", function (snapshot) {
                updateCurrentCards();
            });

            this.getAllCards = function () {
                return currentCards;
            };
            this.getCompanyCards = function () {
                return _.filter(currentCards, function (card) {
                    return _.isUndefined(card.team);
                })
            };

            this.getNotCompleted = function () {
                return _.filter(currentCards, function (card) {
                    return _.isUndefined(card.endDate);
                })
            };


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
                    card.assignee = card.assignee === memberId ? null : card.assignee;
                    card.status = 'unassigned';
                    return card;
                });
            }

            // Replaced with: saveToFirebase
            //function saveToLocalStorage() {
            //    helpers.saveToLocalStorage('cards', currentCards);
            //}


            var actions = [
                {name: constants.actionNames.UPDATE_CARD, callback: updateCard},
                {name: constants.actionNames.ADD_CARD, callback: addCard},
                {name: constants.actionNames.REMOVE_CARD, callback: removeCard},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: unassignMemberFromCards}
            ];

            waitForTokens[constants.storesName.CARDS_STORE] = dispatcher.register(function (payload) {
                var actionName = payload.actionName,
                    data = payload.payload,

                    action = _.find(actions, {name: actionName});

                if (action) {
                    action.callback.apply(this, data);
                    saveToFirebase();
                    this.emitChange();
                }
            }.bind(this));

            function saveToFirebase() {
                cardsFirebaseRef.set(currentCards);
            }

            function saveToLocalStorage() {
                helpers.saveToLocalStorage('cards', currentCards);

            }
            function restoreFromLocalStorage() {
                return helpers.restoreFromLocalStorage('cards');
            }

            function removeFromLocalStorage() {
                helpers.removeFromLocalStorage('cards');
            }
            


        }

        return CardsStore;

    });