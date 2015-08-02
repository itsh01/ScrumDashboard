define(['lodash', '../data/teams', './helpers', 'components/team-management/TeamManagement'],
    function (_, defaultTeamData, helpers) {
        'use strict';
        var filterFunctions = {
            AllTeams: null
            //TeamById: function (id) {
            //    return {id: id};
            //}

        };

        function TeamStore(dispatcher) {
            var SPRINT_SCHEMA = {
                    name: {type: 'string', writable: false},
                    scrumMaster: {type: 'string', defaultValue: null, writable: true},
                    startDate: {type: 'string', defaultValue: null, writable: true},
                    endDate: {type: 'string', defaultValue: null, writable: true},
                    cardLifecycle: {type: 'string-array', defaultValue: [], writable: true},
                    members: {type: 'string-array', defaultValue: [], writable: true},
                    state: {type: 'number', defaultValue: 0, writable: true} // TODO: check what it means
                },
                TEAM_SCHEMA = {
                    name: {type: 'string', writable: false},
                    members: {type: 'string-array', defaultValue: [], writable: true},
                    filterFunc: {type: 'function', defaultValue: null, writable: true} // TODO: check what it means
                    //sprints: {type: 'array', defaultValue: [], writable: true}
                },
                currentTeam = defaultTeamData;
            _.forEach(filterFunctions, function (filterVal, filterFuncName) {
                this['get' + filterFuncName] = function () {
                    return _.filter(currentTeam, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
                };
            }, this);

            this.getTeamById = function (id) {
                return _.cloneDeep(_.find(currentTeam, {id: id}));
            };

            this.getBlankTeam = function () {
                return helpers.getBlankItem(TEAM_SCHEMA);
            };

            this.getBlankSprint = function () {
                return helpers.getBlankItem(SPRINT_SCHEMA);
            };

            function isValidSprint(sprint) {
                return _.every(sprint, function (value, key) {
                    return helpers.isValidValue(value, key, SPRINT_SCHEMA, 'Team Store');
                });
            }

            function isValidTeam(team) {
                return _.every(team, function (value, key) {
                    return helpers.isValidValue(value, key, TEAM_SCHEMA, 'Team Store');
                });
            }

            function addTeam(teamData) {
                var blankTeam = this.getBlankTeam(),
                    teamWithDefaults = _.assign(blankTeam, teamData);
                if (isValidTeam(teamWithDefaults)) {
                    teamWithDefaults.id = helpers.generateGuid();
                    teamWithDefaults.sprints = [];
                    currentTeam.push(teamWithDefaults);
                    return teamWithDefaults.id;
                }
            }

            dispatcher.registerAction('ADD_TEAM', addTeam.bind(this));

            function addSprint(teamId, sprintData) {
                var team = _.find(currentTeam, {id: teamId}),
                    blankSprint = this.getBlankSprint(),
                    sprintWithDefaults = _.assign(blankSprint, sprintData);
                if (_.isEmpty(team)) {
                    console.log('Team Store: attempt to add sprint to non existent team (id:', teamId, ')');
                } else if (isValidSprint(sprintWithDefaults)) {
                    sprintWithDefaults.id = helpers.generateGuid();
                    team.sprints.push(sprintWithDefaults);
                    return sprintWithDefaults.id;
                }
            }


            dispatcher.registerAction('CHANGE_CURRENT_TEAM', changeCurrentTeam.bind(this));

            var currentViewState = {
                currentTeam: defaultTeamData[0]
            };

            this.getCurrentTeam = function () {
                return currentViewState.currentTeam;
            };

            function changeCurrentTeam(teamId) {
                currentViewState.currentTeam = this.getTeamById(teamId);


            }

            this.testAdd = function () {
                var self = this,
                    addedTeamId,
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
                addedTeamId = addTeam.call(self, validTeam);
                addSprint.call(self, addedTeamId, validSprint);
                addSprint.call(self, addedTeamId, invalidSprint);
                _.forEach(invalidTeams, function (team) {
                    addTeam.call(self, team);
                });
                console.log('Test addTeam... done\n\n');
            };
        }

        return TeamStore;
    });