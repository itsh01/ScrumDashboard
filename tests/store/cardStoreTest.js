define(
    [
        '../../src/vendor/lodash',
        './flux',
        '../../src/js/constants'
    ],
    function (_, Flux, constants) {
        'use strict';

        var flux = new Flux();
        flux.dispatcher.registerEventsHandled(function () {});

        function testAdd() {
            var validCards = [
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
                    }
                ],
                action = constants.actionNames.ADD_CARD;
            console.log('Test addCard...');
            _.forEach(validCards, function (card) {
                flux.dispatcher.dispatchAction(action, card);
            });
            _.forEach(invalidCards, function (card) {
                flux.dispatcher.dispatchAction(action, card);
            });
            console.log('Test addCard... done\n\n');
        }

        function testUpdate(cardIds) {
            var validCardData = [
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
                    { // invalid value
                        description: null
                    },
                    { // invalid value
                        description: undefined
                    },
                    { // invalid key
                        id: '90eed4aa-40fe-496e-999a-54a436d66427'
                    }
                ],
                action = constants.actionNames.UPDATE_CARD;
            cardIds.push('non-existent-id');
            console.log('Test updateCard...');
            _.forEach(cardIds, function (id) {
                _.forEach(validCardData.concat(invalidCardData), function (data) {
                    flux.dispatcher.dispatchAction(action, id, data);
                });
            });
            console.log('Test updateCard... done\n\n');
        }

        function testRemove(cardIds) {
            var action = constants.actionNames.REMOVE_CARD;
            console.log('Test removeCard...');
            _.forEach(cardIds, function (id) {
                flux.dispatcher.dispatchAction(action, id);
            });
            flux.dispatcher.dispatchAction(action, 'non-existent-id');
            console.log('Test removeCard... done\n\n');
        }

        return {
            run: function () {
                var ids = ['90eed4aa-40fe-496e-999a-54a436d66427', '386db683-1e6e-46ea-862d-4c1e8974e722'];
                testAdd();
                testUpdate(ids);
                testRemove(ids);
            }
        };
    });