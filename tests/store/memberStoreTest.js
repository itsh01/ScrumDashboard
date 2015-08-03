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

        function test() {
            var nonExistentId = 'non-existent-id',
                existentId = '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                members = [
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
            console.log('Test add/remove/update Member...');
            _.forEach(members, function (member) {
                flux.dispatcher.dispatchAction(constants.actionNames.ADD_MEMBER, member);
                flux.dispatcher.dispatchAction(constants.actionNames.UPDATE_MEMBER, member);
                flux.dispatcher.dispatchAction(constants.actionNames.UPDATE_MEMBER, member);
            });
            flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_MEMBER, existentId);
            flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_MEMBER, nonExistentId);
            console.log('Test add/remove/update Member... done\n\n');
        }


        return {
            run: function () {
                test();
            }
        };
    });