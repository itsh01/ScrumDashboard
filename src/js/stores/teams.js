define([
        'lodash',
        '../data/teams',
        './helpers',
        '../constants'
    ],
    function (_, defaultTeamData, helpers, constants) {
        'use strict';
        var filterFunctions = {
            AllTeams: null
        };

        function TeamStore(dispatcher, getUserCards) {
            var /*RETRO_CARDS_STATUS_SCHEMA = {
                    cardId: {type: 'string'},
                    assigneeId: {type: 'string'},
                    status: {type: 'string'}
                },*/
                SPRINT_SCHEMA = {
                    name: {type: 'string'},
                    scrumMaster: {type: 'string', defaultValue: null},
                    startDate: {type: 'string', defaultValue: null},
                    endDate: {type: 'string', defaultValue: null},
                    cardLifecycle: {type: 'string-array', defaultValue: []},
                    members: {type: 'string-array', defaultValue: []},
                    retroCardsStatus: {type: 'object', defaultValue: null},
                    state: {type: 'number', defaultValue: 0}
                },
                TEAM_SCHEMA = {
                    name: {type: 'string'},
                    members: {type: 'string-array', defaultValue: []},
                    filterFunc: {type: 'function', defaultValue: null}
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

            function removeMemberFromTeams(memberId) {
                var teams = this.getAllTeams();
                currentTeam = _.forEach(teams, function (team) {
                    _.remove(team.members, function (member) {
                        return member === memberId;
                    });
                });
            }

            function getSprint(sprintId, teamId) {
                var collection;
                if (teamId) {
                    collection = _.find(defaultTeamData, {id: teamId});
                } else {
                    collection = [];
                    _.forEach(defaultTeamData, function (team) {
                        if (!_.isEmpty(team.sprints)) {
                            collection = collection.concat(team.sprints);
                        }
                    });
                }
                return _.find(collection, {id: sprintId});
            }

            function retrofySprint(sprintId, teamId) {
                getSprint(sprintId, teamId);
                getUserCards([1]);
                console.log(sprintId, teamId);
            }

            function moveSprintToNextState(sprintId, teamId) {
                console.log(sprintId, teamId);
            }


            dispatcher.registerAction(constants.actionNames.ADD_TEAM, addTeam.bind(this));
            dispatcher.registerAction(constants.actionNames.ADD_SPRINT, addSprint.bind(this));
            dispatcher.registerAction(constants.actionNames.MEMBER_DEACTIVATED, removeMemberFromTeams.bind(this));
            dispatcher.registerAction(constants.actionNames.CHANGE_CURRENT_TEAM, changeCurrentTeam.bind(this));
            dispatcher.registerAction(constants.actionNames.RETROFY_SPRINT, retrofySprint.bind(this));
            dispatcher.registerAction(constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE, moveSprintToNextState.bind(this));

            var currentViewState = {
                currentTeam: defaultTeamData[0]
            };

            this.getCurrentTeam = function () {
                return currentViewState.currentTeam;
            };

            function changeCurrentTeam(teamId) {
                currentViewState.currentTeam = this.getTeamById(teamId);


            }
        }

        return TeamStore;
    });