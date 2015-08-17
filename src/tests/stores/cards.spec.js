define([
        'lodash',
        'eventemitter2',
        'baseFlux',
        'stores/cardsStore',
        'actions/cardsActions',
        'flux/helpers'
    ],
    function (_, EventEmitter, baseFlux, CardsStore, CardsActions, helpers) {
        'use strict';
        describe('CardsStore', function () {
            var mockDispatcher, mockCardsStore, mockCardsData, mockBlankCard, mockCard, mockNewCard, mockUserId, mockTeamId, mockCardsActions;
            beforeEach(function () {
                localStorage.clear();
                mockCardsData = [
                    {
                        id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
                        name: 'connect solid state hard drive',
                        description: 'You cant hack the alarm without bypassing the multi-byte SDD alarm!',
                        status: 'In progress',
                        score: 3,
                        team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
                        assignee: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        startDate: null,
                        endDate: null
                    },
                    {
                        id: '90eed4aa-40fe-496e-999a-54a436d66427',
                        name: 'hack digital protocol',
                        description: 'Ill compress the digital EXE protocol, that should protocol the EXE protocol!',
                        status: 'unassigned',
                        score: 1,
                        team: null,
                        assignee: null,
                        startDate: null,
                        endDate: null
                    },
                    {
                        id: 'eaf1abfe-639f-4a8b-8e02-add0acc9833a',
                        name: 'quantify open-source microchip',
                        description: 'The TCP driver is down, bypass the 1080p driver so we can bypass the TCP driver!',
                        status: 'unassigned',
                        score: 3,
                        team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
                        assignee: null,
                        startDate: null,
                        endDate: null
                    }
                ];
                mockBlankCard = {
                    name: '',
                    description: '',
                    score: null,
                    team: null,
                    status: 'unassigned',
                    assignee: null,
                    startDate: null,
                    endDate: null
                };
                mockNewCard = {
                    name: 'Open-source the universe',
                    description: 'The flux capacitor is whack. Fix it.!',
                    status: 'unassigned',
                    score: 12,
                    team: null,
                    assignee: null,
                    startDate: null,
                    endDate: null
                };
                mockUserId = mockCardsData[0].assignee;
                mockTeamId = mockCardsData[0].team;

                var eventEmitter = new EventEmitter(),
                    waitForTokens = {};
                mockDispatcher = new baseFlux.Dispatcher();
                mockCardsStore = new CardsStore(mockDispatcher, eventEmitter, waitForTokens, mockCardsData);
                mockCardsActions = new CardsActions(mockDispatcher);
                mockCard = mockCardsData[0];
            });

            describe('getCardById', function () {

                it('should return a card object if id is matched', function () {
                    var resCard = mockCardsStore.getCardById(mockCard.id);

                    expect(resCard).toEqual(mockCard);
                });

                it('should return undefined if card id is unmatched', function () {
                    var res = mockCardsStore.getCardById('');

                    expect(res).not.toBeDefined();
                });

                it('should return a cloned card object, changing it will not affect the store', function () {
                    var resCard = mockCardsStore.getCardById(mockCardsData[0].id);
                    resCard.name = 'blah';
                    var storeCard = mockCardsStore.getCardById(mockCardsData[0].id);

                    expect(resCard).not.toEqual(storeCard);
                });
            });

            describe('getAllCards', function () {
                it('should return the array of card objects given as default', function () {
                    var allCards = mockCardsStore.getAllCards();

                    expect(mockCardsData).toEqual(allCards);
                    expect(allCards.length).toEqual(3);
                });
            });

            describe('getTeamCards', function () {
                it('should return all cards assigned to a specific team by id', function () {
                    var teamCards = mockCardsStore.getTeamCards(mockTeamId);

                    expect(teamCards.length).toEqual(2);
                    expect(teamCards[0]).toEqual(mockCardsData[0]);
                });
            });

            describe('getCompanyCards', function () {
                it('should return all cards not assigned to a specific team', function () {
                    var companyCards = mockCardsStore.getCompanyCards();

                    expect(companyCards.length).toEqual(1);
                    expect(companyCards[0]).toEqual(mockCardsData[1]);
                });
            });

            describe('getUserCards', function () {
                it('should return all cards assigned to a specific user id', function () {
                    var userCards = mockCardsStore.getUserCards(mockUserId);

                    expect(userCards.length).toEqual(1);
                    expect(userCards[0]).toEqual(mockCardsData[0]);
                });
            });

            describe('getNotCompleted', function () {
                it('should return all cards with endDate of null', function () {
                    var unfinishedCards = mockCardsStore.getNotCompleted();

                    expect(unfinishedCards.length).toEqual(3);
                    expect(unfinishedCards).toEqual(mockCardsData);
                });
            });

            describe('getBlankCard', function () {
                it('should return a blank card object', function () {
                    var blankCard = mockCardsStore.getBlankCard();

                    expect(blankCard).toEqual(mockBlankCard);
                });
            });

            describe('addCard', function () {
                var mockGuid;
                beforeEach(function () {
                    spyOn(mockCardsStore, 'getBlankCard').and.returnValue(mockBlankCard);
                    mockGuid = '295a6ee1-0e46-45be-8c8f-8be30ee78635';
                    spyOn(helpers, 'generateGuid').and.returnValue(mockGuid);
                });

                it('should add a new valid card to the store', function () {
                    spyOn(helpers, 'isValidValue').and.returnValue(true);
                    var initialAllCards = mockCardsStore.getAllCards();
                    mockCardsActions.addCard(mockNewCard);
                    var modifiedAllCards = mockCardsStore.getAllCards();
                    var expectedCardResult = mockNewCard;
                    expectedCardResult.id = mockGuid;

                    expect(initialAllCards.length + 1).toEqual(modifiedAllCards.length);
                    expect(expectedCardResult).toEqual(modifiedAllCards[3]);
                });

                it('should not add an invalid card to the store', function () {
                    spyOn(helpers, 'isValidValue').and.callThrough();
                    mockNewCard.name = undefined;
                    mockCardsActions.addCard(mockNewCard);
                    var allCards = mockCardsStore.getAllCards();

                    expect(allCards).toEqual(mockCardsData);
                });
            });

            describe('updateCard', function () {
                var mockGuid, cardFromStore, cardId, editedCard;
                beforeEach(function () {
                    mockGuid = '295a6ee1-0e46-45be-8c8f-8be30ee78635';
                    cardFromStore = mockCardsData[0];
                    cardId = cardFromStore.id;
                    editedCard = _.cloneDeep(cardFromStore);
                    editedCard.name = 'blah';
                });

                it('should update card if data is valid', function () {
                    mockCardsActions.updateCard(cardId, editedCard);
                    var resCard = mockCardsStore.getCardById(cardId);

                    expect(resCard.name).toEqual('blah');
                });

                it('should ignore id override when updating card', function () {
                    editedCard.id = mockGuid;
                    mockCardsActions.updateCard(cardId, editedCard);
                    var noCard = mockCardsStore.getCardById(mockGuid);
                    var resCard = mockCardsStore.getCardById(cardId);

                    expect(noCard).not.toBeDefined();
                    expect(resCard.id).toEqual(cardId);
                    expect(resCard.name).toEqual('blah');
                });

                it('should not update the card if all fields are not valid', function () {
                    editedCard.description = 42;
                    mockCardsActions.updateCard(cardId, editedCard);
                    var resCard = mockCardsStore.getCardById(cardId);

                    expect(resCard.description).toEqual(cardFromStore.description);
                    expect(resCard).toEqual(cardFromStore);
                });
            });
        });
    }
);