define(
    [
        '../../src/vendor/lodash',
        './flux'
    ],
    function (_,
              Flux) {
        'use strict';

        var flux = new Flux();
        flux.dispatcher.registerEventsHandled(function () {});

        function testAdd() {
            var addedTeamId = '1f7a4375-e7db-4798-969e-17325acde499',
                validSprint = {
                    name: 'aliquip reprehenderit',
                    scrumMaster: null,
                    startDate: null,
                    endDate: null,
                    cardLifecycle: [],
                    members: [
                        '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                        '061804a2-1f93-40e1-bf49-57b82e5b568b'
                    ],
                    state: 0
                },
                validTeam = {
                    name: 'Team A',
                    members: [
                        '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                        '061804a2-1f93-40e1-bf49-57b82e5b568b',
                        '183323c8-d707-4471-8736-373eba8aaa8c',
                        'aaef53cc-34bd-4d1f-bdda-9bf5e07ca2be'
                    ],
                    filterFunc: null
                },
                invalidSprint = {
                    name: 'aliquip reprehenderit',
                    cardLifecycle: [1, 2, 3],
                    members: [
                        '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                        '061804a2-1f93-40e1-bf49-57b82e5b568b'
                    ],
                    state: 0
                },
                invalidTeams = [
                    {
                        name: 'Team B',
                        members: [{a: 2}, {b: 3}],
                        filterFunc: null
                    },
                    {
                        name: '',
                        members: [
                            '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            '15fc4096-b641-436a-bf2d-8fbdeedec7b2'
                        ],
                        filterFunc: null
                    }
                ];
            console.log('Test addTeam...');
            flux.dispatcher.dispatchAction('ADD_TEAM', validTeam);
            flux.dispatcher.dispatchAction('ADD_SPRINT', addedTeamId, validSprint);
            flux.dispatcher.dispatchAction('ADD_SPRINT', addedTeamId, invalidSprint);
            _.forEach(invalidTeams, function (team) {
                flux.dispatcher.dispatchAction('ADD_TEAM', team);
            });
            console.log('Test addTeam... done\n\n');
        }


        return {
            run: function () {
                testAdd();
            }
        };
    });