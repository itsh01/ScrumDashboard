define([
        '../../../vendor/lodash',
        'flux/helpers',
        '../../constants'
    ],
    function (_, helpers, constants) {
        'use strict';

        function TeamStore(dispatcher, eventEmitter, waitForTokens, defaultTeamData, getUserCards) {

            var dataFileVersion = '1',
                SPRINT_SCHEMA = {
                    name: {type: 'string', defaultValue: 'New Sprint'},
                    scrumMaster: {type: 'string', defaultValue: ''},
                    startDate: {type: 'string', defaultValue: ''},
                    endDate: {type: 'string', defaultValue: ''},
                    cardLifecycle: {type: 'string-array', defaultValue: ['Backlog', 'In progress', 'Done']},
                    members: {type: 'string-array', defaultValue: []},
                    retroCardsStatus: {type: 'object', defaultValue: []},
                    state: {type: 'number', defaultValue: 0}
                },
                TEAM_SCHEMA = {
                    name: {type: 'string'},
                    members: {type: 'string-array', defaultValue: []},
                    active: {type: 'boolean', defaultValue: true}
                },
                teamsData,
                currentViewState;

            (function init() {

                this.emitChange = function () {
                    eventEmitter.emit(constants.flux.TEAMS_STORE_CHANGE);
                };

                this.addChangeListener = function (callback) {
                    eventEmitter.on(constants.flux.TEAMS_STORE_CHANGE, callback);
                };

                this.removeChangeListener = function (callback) {
                    eventEmitter.removeListener(constants.flux.TEAMS_STORE_CHANGE, callback);
                };

                if (dataFileVersion === localStorage.getItem('teamVersion')) {
                    teamsData = restoreFromLocalStorage();
                } else {
                    teamsData = defaultTeamData;
                    saveToLocalStorage();
                    localStorage.setItem('teamVersion', dataFileVersion);
                }

                var filterFunctions = {
                    AllTeams: null,
                    AllActiveTeams: {active: true}
                };

                _.forEach(filterFunctions, function (filterVal, filterFuncName) {
                    this['get' + filterFuncName] = function () {
                        return _.filter(teamsData, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
                    };
                }, this);

                currentViewState = {
                    currentTeamId: getDefaultTeamId.apply(this),
                    currentSprintId: (_.last(teamsData[0].sprints)).id,
                    currentExistingMemberId: teamsData[0].members[0]
                };

            }).apply(this);

            this.getCurrentExistingMemberId = function () {
                return currentViewState.currentExistingMemberId;
            };

            this.getTeamById = function (id) {
                return _.cloneDeep(_.find(teamsData, {id: id}));
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

            this.getMemberCardsInSprint = function (memberId, sprintId) {
                var sprint = getSprintById(sprintId),
                    memberCards = getUserCards(memberId),
                    sprintStartDate = new Date(sprint.startDate),
                    sprintEndDate = new Date(sprint.endDate);

                var membersCardsInSprint = _.filter(memberCards, function (card) {
                    if (card.startDate === '') {
                        return true;
                    }
                    var cardStartDate = new Date(card.startDate);
                    if (card.endDate === '') {
                        return helpers.onSegment(sprintStartDate, sprintEndDate, cardStartDate);
                    }
                    var cardEndDate = new Date(card.endDate);
                    return helpers.onSegment(sprintStartDate, sprintEndDate, cardStartDate) ||
                           helpers.onSegment(sprintStartDate, sprintEndDate, cardEndDate);
                });
                return membersCardsInSprint;
            };

            this.getCurrentTeam = function () {
                return this.getTeamById(currentViewState.currentTeamId) || {};
            };

            this.getSprintIndex = function (sprintId) {
                var sprints = this.getTeamById(currentViewState.currentTeamId).sprints;
                for (var i = 0; i < sprints.length; i++) {
                    if (sprints[i].id === sprintId) {
                        return i;
                    }
                }
                return -1;
            };

            this.getCurrentSprint = function () {
                var currTeam = this.getCurrentTeam();
                if (!currTeam.id) {//|| currTeam.sprints.length < 1) {
                    return {};
                }
                resetCurrentSprintIdIfInvalid.call(this);
                return this.getSprintById(currentViewState.currentSprintId);
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
                    teamWithDefaults.sprints = [this.getBlankSprint()];
                    teamWithDefaults.sprints[0].id = helpers.generateGuid();
                    teamsData.push(teamWithDefaults);
                    return teamWithDefaults.id;
                }
            }

            function addSprint(sprintData, teamId) {
                teamId = teamId || currentViewState.currentTeamId;
                var team = _.find(teamsData, {id: teamId}),
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

            function removeDeactivatedMemberFromTeams(memberId) {
                _.forEach(teamsData, function (team) {
                    _.remove(team.members, function (id) {
                        return id === memberId;
                    });
                });
            }

            function addMemberToTeam(teamId, memberId) {
                var team = _.find(teamsData, {id: teamId});
                if (team.active) {
                    team.members.push(memberId);
                }
            }

            function removeMemberFromTeam(teamId, memberId) {
                var team = _.find(teamsData, {id: teamId});
                if (team.active) {
                    _.remove(team.members, function (id) {
                        return id === memberId;
                    });
                }
            }

            function addMemberToSprint(teamId, sprintId, memberId) {
                var team = _.find(teamsData, {id: teamId});
                var sprint = _.filter(team.sprints, {id: sprintId});
                if (!sprint.endDate) {
                    sprint.members.push(memberId);
                }
            }

            function removeMemberFromSprint(teamId, sprintId, memberId) {
                var team = _.find(teamsData, {id: teamId});
                var sprint = _.filter(team.sprints, {id: sprintId});
                if (!sprint.endDate) {
                    sprint.members = _.remove(sprint.members, {id: memberId});
                }
            }

            function getSprintsByTeamId(teamId) {
                var collection = _.find(teamsData, {id: teamId});
                if (collection) {
                    collection = collection.sprints;
                }
                return collection;
            }

            function getSprintById(sprintId) {
                var sprint;
                _.every(teamsData, function (team) {
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
                    cards = cards.concat(this.getMemberCardsInSprint(memberId, sprint.id));
                }.bind(this));
                _.forEach(cards, function (card) {
                    if (card.status === sprint.cardLifecycle[sprint.cardLifecycle.length - 1]) {
                        card.endDate = sprint.endDate;
                    }
                });
                sprint.retroCardsStatus = [];
                _.forEach(cards, function (card) {
                    sprint.retroCardsStatus.push({
                        cardId: card.id,
                        assigneeId: card.assignee,
                        status: card.status
                    });
                });
            }

            function validateSprintBeforeMovingToNextState(sprint, sprintId) {
                if (!sprint) {
                    console.log('Team Store: sprint does not exist (sprint ID:', sprintId, ')');
                    return false;
                }
                if (sprint.state === constants.SPRINT_STATUS.RETRO) {
                    console.log('Team Store: sprint is already in retro (sprint ID:', sprintId, ')');
                    return false;
                }
                return true;
            }

            // arguments are optional
            function retrofySprint(sprintId, teamId) {
                sprintId = sprintId || currentViewState.currentSprintId;
                var sprint = getSprint(sprintId, teamId);
                if (!validateSprintBeforeMovingToNextState(sprint, sprintId)) {
                    return;
                }
                setRetroCardsStatus.call(this, sprint);
                sprint.state = constants.SPRINT_STATUS.RETRO;
            }

            // teamId is an optional argument
            function moveSprintToNextState(sprintId, teamId) {
                sprintId = sprintId || currentViewState.currentSprintId;
                var sprint = getSprint(sprintId, teamId);
                if (!validateSprintBeforeMovingToNextState(sprint, sprintId)) {
                    return;
                }
                sprint.state++;
                if (sprint.state === constants.SPRINT_STATUS.RETRO) {
                    setRetroCardsStatus.call(this, sprint);
                }
            }

            // teamId is an optional argument
            function updateSprint(sprintId, newSprintData, teamId) {
                delete newSprintData.id;
                if (isValidSprint(newSprintData)) {
                    var sprint = getSprint(sprintId, teamId);
                    return helpers.updateItem([sprint], sprintId, newSprintData, 'Team Store');
                }
                return false;
            }

            function deactivateTeam(teamId) {
                var team = _.find(teamsData, {id: teamId});
                if (team) {
                    team.active = false;
                    saveToLocalStorage();
                    if (teamId === currentViewState.currentTeamId) {
                        var defaultTeamId = getDefaultTeamId.apply(this);
                        changeCurrentTeamId.call(this, defaultTeamId);
                    }
                    return true;
                }
                console.log('Team Store: attempt to deactivate non existent team (teamId: ', teamId, ')');
                return false;
            }

            function getDefaultTeamId() {
                return this.getAllActiveTeams()[0] && this.getAllActiveTeams()[0].id;
            }

            function saveToLocalStorage() {
                helpers.saveToLocalStorage('teams', teamsData);
            }

            function restoreFromLocalStorage() {
                return helpers.restoreFromLocalStorage('teams');
            }

            function resetCurrentSprintIdIfInvalid() {
                var isCurrSprintValid = this.getSprintIndex(currentViewState.currentSprintId) !== -1;
                if (!isCurrSprintValid) {
                    currentViewState.currentSprintId = _.last(this.getCurrentTeam().sprints).id;
                }
            }

            function moveCurrentSprintId(forward) {
                var curSprintIndex = this.getSprintIndex(currentViewState.currentSprintId),
                    sprintsNum = this.getTeamById(currentViewState.currentTeamId).sprints.length,
                    newSprintIndex = (forward) ? curSprintIndex + 1 : curSprintIndex - 1;
                if (newSprintIndex > 0 && newSprintIndex < sprintsNum) {
                    currentViewState.currentSprintId = this.getTeamById(currentViewState.currentTeamId).sprints[newSprintIndex].id;
                }
            }

            function setCurrentSprintId(newSprintId) {
                currentViewState.currentSprintId = newSprintId;
            }

            function changeCurrentTeamId(teamId) {
                currentViewState.currentTeamId = teamId;
                var currTeam = this.getCurrentTeam();
                setCurrentSprintId.call(this, currTeam.sprints[currTeam.sprints.length - 1]);
            }

            function changeExistingMemberId(memberId) {
                currentViewState.currentExistingMemberId = memberId;
            }

            var actions = [
                {name: constants.actionNames.ADD_TEAM, callback: addTeam},
                {name: constants.actionNames.ADD_SPRINT, callback: addSprint},
                {name: constants.actionNames.MEMBER_DEACTIVATED, callback: removeDeactivatedMemberFromTeams},
                {name: constants.actionNames.DEACTIVATE_TEAM, callback: deactivateTeam},
                {name: constants.actionNames.ADD_MEMBER_TO_TEAM, callback: addMemberToTeam},
                {name: constants.actionNames.REMOVE_MEMBER_FROM_TEAM, callback: removeMemberFromTeam},

                {name: constants.actionNames.RETROFY_SPRINT, callback: retrofySprint},
                {name: constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE, callback: moveSprintToNextState},
                {name: constants.actionNames.UPDATE_SPRINT, callback: updateSprint},
                {name: constants.actionNames.ADD_MEMBER_TO_SPRINT, callback: addMemberToSprint},
                {name: constants.actionNames.REMOVE_MEMBER_FROM_SPRINT, callback: removeMemberFromSprint},

                {name: constants.actionNames.CHANGE_CURRENT_TEAM_ID, callback: changeCurrentTeamId},
                {name: constants.actionNames.SET_CURRENT_SPRINT_ID, callback: setCurrentSprintId},
                {name: constants.actionNames.MOVE_CURRENT_SPRINT_ID, callback: moveCurrentSprintId},
                {name: constants.actionNames.CHANGE_EXISTING_MEMBER_ID, callback: changeExistingMemberId}
            ];

            waitForTokens[constants.storesName.TEAMS_STORE] = dispatcher.register(function (payload) {
                var actionName = payload.actionName,
                    data = payload.payload,

                    action = _.find(actions, {name: actionName});

                if (action) {
                    action.callback.apply(this, data);
                    saveToLocalStorage();
                    this.emitChange();
                }

            }.bind(this));
        }


        return TeamStore;

    });
