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

            this.getSprintById = function (id) {
                return _.cloneDeep(getSprintById(id));
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

            function getSprintsByTeamId(teamId) {
                var collection = _.find(defaultTeamData, {id: teamId});
                if (collection) {
                    collection = collection.sprints;
                }
                return collection;
            }

            function getSprintById(sprintId) {
                var sprint;
                _.every(defaultTeamData, function (team) {
                    sprint = _.find(team.sprints, {id: sprintId});
                    return sprint === undefined;
                });
                return sprint;
            }

            // teamId is an optional argument
            function getSprint(sprintId, teamId) {
                if (teamId) {
                    return _.find(getSprintsByTeamId(teamId), {id: sprintId});
                }
                return getSprintById(sprintId);
            }

            function setRetroCardsStatus(sprint) {
                var cards = [];
                _.forEach(sprint.members, function (memberId) {
                    cards = cards.concat(getUserCards(memberId));
                });
                sprint.retroCardsStatus = [];
                _.forEach(cards, function (card) {
                    sprint.retroCardsStatus.push({
                        cardId: card.id,
                        assigneeId: card.assignee,
                        status: card.status
                    });
                });
                console.log(sprint.retroCardsStatus);
            }

            function validateSprintBeforeMovingToNextState(sprint, sprintId) {
                if (!sprint) {
                    console.log('Team Store: sprint does not exist (sprint ID:', sprintId, ')');
                    return false;
                }
                if (sprint.status === constants.SPRINT_STATUS.RETRO) {
                    console.log('Team Store: sprint is already in retro (sprint ID:', sprintId, ')');
                    return false;
                }
                return true;
            }

            // teamId is an optional argument
            function retrofySprint(sprintId, teamId) {
                var sprint = getSprint(sprintId, teamId);
                if (!validateSprintBeforeMovingToNextState(sprint, sprintId)) {
                    return;
                }
                setRetroCardsStatus(sprint);
                sprint.status = constants.SPRINT_STATUS.RETRO;
            }

            // teamId is an optional argument
            function moveSprintToNextState(sprintId, teamId) {
                var sprint = getSprint(sprintId, teamId);
                if (!validateSprintBeforeMovingToNextState(sprint, sprintId)) {
                    return;
                }
                sprint.status++;
                if (sprint.status === constants.SPRINT_STATUS.RETRO) {
                    setRetroCardsStatus(sprint);
                }
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