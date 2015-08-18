define([
        'lodash',
        'eventemitter2',
        'baseFlux',
        'stores/teamsStore',
        'actions/teamsActions',
        'flux/helpers'
    ],
    function (_, EventEmitter, baseFlux, TeamsStore, TeamsActions, helpers) {
        'use strict';

        describe('TeamsStore', function () {

            var teamsActions, activeTeam, inactiveTeam,
                sprint, teamsArr, teamsStore, eventEmitter, waitForTokens, dispatcher;

            beforeEach(function () {
                localStorage.clear();
            });

            describe('basic getters', function () {

                var memberId, teamId, sprintId, teamName;

                beforeEach(function () {
                    memberId = helpers.generateGuid();
                    teamId = helpers.generateGuid();
                    sprintId = helpers.generateGuid();
                    teamName = 'Directives';

                    sprint = {
                        id: sprintId,
                        name: 'R2D2',
                        scrumMaster: memberId,
                        startDate: '2015-08-24',
                        endDate: '2015-08-31',
                        cardLifecycle: ['Backlog', 'In progress', 'Done'],
                        members: [memberId],
                        state: 1,
                        retroCardsStatus: []
                    };

                    activeTeam = {
                        members: [memberId],
                        active: true,
                        id: teamId,
                        sprints: [sprint],
                        name: teamName
                    };

                    inactiveTeam = _.cloneDeep(activeTeam);
                    inactiveTeam.id = helpers.generateGuid();
                    inactiveTeam.active = false;
                    teamsArr = [activeTeam, inactiveTeam];

                    eventEmitter = new EventEmitter();
                    waitForTokens = {};
                    dispatcher = new baseFlux.Dispatcher();
                    teamsActions = new TeamsActions(dispatcher);
                    teamsStore = new TeamsStore(dispatcher, eventEmitter, waitForTokens, teamsArr);
                });

                describe('getTeamById', function () {

                    it('should return a team clone by team id', function () {
                        var actualTeam = teamsStore.getTeamById(teamId);
                        expect(actualTeam).toEqual(activeTeam);
                        actualTeam.name = 'a new name';
                        expect(actualTeam.name).not.toEqual(activeTeam.name);
                    });

                    it('should return undefined if no team found', function () {
                        expect(teamsStore.getTeamById('not-existent-id')).toBe(undefined);
                    });
                });

                describe('getSprintById', function () {

                    it('should return a sprint clone by sprint id', function () {
                        var actualSprint = teamsStore.getSprintById(sprintId);
                        expect(actualSprint).toEqual(sprint);
                        actualSprint.name = 'a new name';
                        expect(actualSprint.name).not.toEqual(sprint.name);
                    });

                    it('should return undefined if no sprint found', function () {
                        expect(teamsStore.getSprintById('not-existent-id')).toBe(undefined);
                    });

                });

                describe('getAllTeams', function () {

                    it('should return all teams', function () {
                        expect(teamsStore.getAllTeams()).toEqual(teamsArr);
                    });
                });

                describe('getAllActiveTeams', function () {

                    it('should return all active teams', function () {
                        expect(teamsStore.getAllActiveTeams()).toEqual([activeTeam]);
                    });
                });
            });

            describe('basic setters', function () {

                describe('addTeam', function () {

                    var validTeam;

                    beforeEach(function () {
                        var validTeamData = _.cloneDeep(activeTeam);
                        delete validTeamData.sprints;
                        delete validTeamData.id;
                        teamsActions.addTeam(validTeamData);
                        var allTeams = teamsStore.getAllTeams();
                        validTeam = _.filter(allTeams, function (team) {
                            return team.id !== inactiveTeam.id && team.id !== activeTeam.id;
                        })[0];
                    });

                    it('should add a new team if team data is valid', function () {
                        expect(validTeam).toBeDefined();
                    });

                    it('should append a blank sprint to newly created team', function () {
                        delete validTeam.sprints[0].id;
                        expect(validTeam.sprints).toEqual([teamsStore.getBlankSprint()]);
                    });

                    it('should not add a new team if team data is invalid', function () {
                        teamsActions.addTeam({invalid: true});
                        var allTeams = teamsStore.getAllTeams();
                        var notAdded = _.every(allTeams, function (team) {
                            return !team.invalid;
                        });
                        expect(notAdded).toBe(true);
                    });
                });
                /*
                 addSprint(sprintData, teamId)
                 addMemberToTeam(teamId, memberId)
                 removeMemberFromTeam(teamId, memberId)
                 deactivateTeam(teamId)
                 updateSprint(sprintId, newSprintData, teamId)
                 addMemberToSprint(teamId, sprintId, memberId)
                 removeMemberFromSprint(teamId, sprintId, memberId)
                 */
            });

            describe('currentViewState manipulations', function () {
                /*
                 changeCurrentTeamId(teamId)
                 changeExistingMemberId(memberId)
                 setCurrentSprintId(newCurSprintId)
                 moveCurrentSprintId(forward)
                 */
            });

            describe('sprint status update', function () {
                /*
                 retrofySprint(sprintId, teamId)
                 moveSprintToNextState(sprintId, teamId)
                 */
            });

        });


    });