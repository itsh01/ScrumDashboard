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

        function testAddMember() {
            var members = [
                    { // all data supplied
                        name: 'A',
                        image: 'link',
                        active: true
                    },
                    {
                        name: 'B'
                    },
                    { // attempt to set id
                        name: 'C',
                        id: '123',
                        image: 'link',
                        active: true
                    },
                    { // illegal value
                        name: 'D',
                        active: 'false'
                    }
                ];
            console.log('Test addMember...');
            _.forEach(members, function (member) {
                flux.dispatcher.dispatchAction(constants.actionNames.ADD_MEMBER, member);
            });
            console.log('Test addMember... done\n\n');
        }

        function testUpdateMember() {
            var nonExistentId = 'non-existent-id',
                existentId = '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                members = [
                    {
                        name: 'B'
                    },
                    { // attempt to set id
                        name: 'C',
                        id: '123'
                    },
                    { // illegal value type
                        active: 'false'
                    }
                ];
            console.log('Test updateMember...');
            flux.dispatcher.dispatchAction(constants.actionNames.UPDATE_MEMBER, nonExistentId, members[0]);
            _.forEach(members, function (member) {
                flux.dispatcher.dispatchAction(constants.actionNames.UPDATE_MEMBER, existentId, member);
            });
            console.log('Test updateMember... done\n\n');
        }

        function testRemoveMember() {
            var nonExistentId = 'non-existent-id',
                existentId = '0e8b324c-d49a-474d-8af4-f93bcc6a1511';
            console.log('Test removeMember...');

            flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_MEMBER, existentId);
            flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_MEMBER, nonExistentId);
            console.log('Test removeMember... done\n\n');
        }

        return {
            run: function () {
                testAddMember();
                testUpdateMember();
                testRemoveMember();
            }
        };
    });