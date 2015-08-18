define([
        'lodash',
        'eventemitter2',
        'baseFlux',
        'stores/teamsStore',
        'actions/teamsActions',
        'flux/helpers',
        'Firebase'
    ],
    function (_, EventEmitter, baseFlux, TeamsStore, TeamsActions, helpers, Firebase) {
        'use strict';

        describe('TeamsStore', function () {

            var teamsActions, activeTeam, inactiveTeam, memberId,
                sprint, teamsArr, teamsStore, eventEmitter, waitForTokens, dispatcher;

            function getUserCards(userId) {
                return (userId === memberId) ? [{}] : null;
            }

            beforeEach(function () {
                localStorage.clear();
            });

            describe('basic getters', function () {

                var teamId, sprintId, teamName;

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
                        state: 1
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
                    inactiveTeam.sprints[0].id = helpers.generateGuid();
                    teamsArr = [activeTeam, inactiveTeam];

                    eventEmitter = new EventEmitter();
                    waitForTokens = {};
                    dispatcher = new baseFlux.Dispatcher();
                    teamsActions = new TeamsActions(dispatcher);

                    var firebaseURL = 'https://scrum-dashboard-test.firebaseio.com';
                    var teamPars = {
                        dispatcher: dispatcher,
                        eventEmitter: eventEmitter,
                        waitForTokens: waitForTokens,
                        defaultTeamData: teamsArr,
                        getUserCards: getUserCards,
                        fireBaseURL: firebaseURL + '/teams'
                    };

                    var mainFirebaseRef = new Firebase(firebaseURL);
                    mainFirebaseRef.set({teams: teamsArr});
                    teamsStore = new TeamsStore(teamPars);
                });

                describe('getTeamById', function () {

                    it('should return a team clone by team id', function () {
                        var actualTeam = teamsStore.getTeamById(teamId);
                        _.forEach(activeTeam, function (value, key) {
                            expect(actualTeam[key]).toEqual(value);
                        });
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
                        var blankSprint = teamsStore.getBlankSprint();
                        // TODO: TRY TO AVOID IT
                        delete blankSprint.retroCardsStatus;
                        delete blankSprint.members;
                        expect(validTeam.sprints).toEqual([blankSprint]);
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

                describe('addSprint', function () {

                    var allSprints;

                    beforeEach(function () {
                        allSprints = teamsStore.getTeamById(activeTeam.id).sprints;
                    });

                    describe('valid sprint data supplied', function () {

                        var validSprint;

                        function checkSuccess() {
                            expect(allSprints.length + 1).toBe(teamsStore.getTeamById(activeTeam.id).sprints.length);
                            allSprints = teamsStore.getTeamById(activeTeam.id).sprints;
                            var addedSprint = allSprints[allSprints.length - 1];
                            delete addedSprint.id;
                            expect(addedSprint).toEqual(validSprint);
                        }

                        beforeEach(function () {
                            validSprint = _.cloneDeep(sprint);
                            delete validSprint.id;
                        });

                        it('should add a new sprint with supplied data to team with specified id', function () {
                            teamsActions.addSprint(validSprint, activeTeam.id);
                            checkSuccess();
                        });

                        it('should add a new sprint to current team if team id is not provided', function () {
                            teamsActions.addSprint(validSprint);
                            checkSuccess();
                        });

                    });

                    describe('invalid sprint data supplied', function () {

                        var invalidSprint;

                        beforeEach(function () {
                            invalidSprint = _.cloneDeep(sprint);
                            invalidSprint.illegalKey = 'illegal';
                        });

                        it('should not add sprint to team with specified id', function () {
                            teamsActions.addSprint(invalidSprint, activeTeam.id);
                            expect(allSprints.length).toBe(teamsStore.getTeamById(activeTeam.id).sprints.length);
                        });

                        it('should not add sprint to current team if team id is not provided', function () {
                            teamsActions.addSprint(invalidSprint);
                            expect(allSprints.length).toBe(teamsStore.getTeamById(activeTeam.id).sprints.length);
                        });

                    });
                });

                describe('addMemberToTeam', function () {

                    var newMemberId;

                    beforeEach(function () {
                        newMemberId = helpers.generateGuid();
                    });

                    it('should add member id to members of team with specified id if the team is active', function () {
                        teamsActions.addMemberToTeam(activeTeam.id, newMemberId);
                        expect(teamsStore.getTeamById(activeTeam.id).members).toContain(newMemberId);
                    });

                    it('should not add member id to members of team with specified id if the team is inactive', function () {
                        teamsActions.addMemberToTeam(inactiveTeam.id, newMemberId);
                        expect(teamsStore.getTeamById(inactiveTeam.id).members).not.toContain(newMemberId);
                    });

                    it('should not change team members if the member is already in team', function () {
                        var membersNum = teamsStore.getTeamById(activeTeam.id).members.length;
                        teamsActions.addMemberToTeam(activeTeam.id, memberId);
                        expect(teamsStore.getTeamById(activeTeam.id).members.length).toBe(membersNum);
                    });

                });

                describe('removeMemberFromTeam', function () {

                    it('should remove member id from members of team with specified id if the team is active', function () {
                        teamsActions.removeMemberFromTeam(activeTeam.id, memberId);
                        expect(teamsStore.getTeamById(activeTeam.id).members).not.toContain(memberId);
                    });

                    it('should not remove member id from members of team with specified id if the team is inactive', function () {
                        teamsActions.removeMemberFromTeam(inactiveTeam.id, memberId);
                        expect(teamsStore.getTeamById(inactiveTeam.id).members).toContain(memberId);
                    });

                    it('should do nothing if the member does not exist', function () {
                        var membersNum = teamsStore.getTeamById(activeTeam.id).members.length;
                        teamsActions.removeMemberFromTeam(activeTeam.id, 'not-existent-id');
                        expect(teamsStore.getTeamById(activeTeam.id).members.length).toBe(membersNum);
                    });

                });

                describe('deactivateTeam', function () {

                    it('should mark active team as inactive', function () {
                        teamsActions.deactivateTeam(activeTeam.id);
                        expect(teamsStore.getTeamById(activeTeam.id).active).toBe(false);
                    });

                    it('should do nothing if team is already inactive', function () {
                        teamsActions.deactivateTeam(inactiveTeam.id);
                        expect(teamsStore.getTeamById(inactiveTeam.id).active).toBe(false);
                    });

                });

                describe('updateSprint', function () {

                    var allSprints;

                    beforeEach(function () {
                        allSprints = teamsStore.getTeamById(activeTeam.id).sprints;
                    });

                    describe('valid sprint data supplied', function () {

                        var validSprintData;

                        beforeEach(function () {
                            validSprintData = {
                                name: 'new name',
                                startDate: '2015-08-23',
                                endDate: '',
                                retroCardsStatus: ['Backlog', 'Done'],
                                state: 1,
                                scrumMaster: helpers.generateGuid(),
                                cardLifecycle: ['Start', 'End'],
                                members: [helpers.generateGuid()]
                            };
                        });

                        it('should update sprint', function () {
                            teamsActions.updateSprint(sprint.id, validSprintData);
                            var updatedTeam = teamsStore.getTeamById(activeTeam.id);
                            var updatedSprint = updatedTeam.sprints[0];
                            var res = _.every(validSprintData, function (value, key) {
                                return _.isEqual(updatedSprint[key], value);
                            });
                            expect(res).toBe(true);
                            expect(allSprints.length).toBe(updatedTeam.sprints.length);
                        });

                    });

                    describe('invalid sprint data supplied', function () {

                        it('should not update sprint', function () {
                            teamsActions.updateSprint(sprint.id, {invalid: 'invalid'});
                            var updatedTeam = teamsStore.getTeamById(activeTeam.id);
                            var updatedSprint = updatedTeam.sprints[0];
                            expect(updatedSprint.invalid).not.toBeDefined();
                            expect(allSprints.length).toBe(updatedTeam.sprints.length);
                        });
                    });

                });


                //updateSprint(sprintId, newSprintData, teamId)
                //addMemberToSprint(teamId, sprintId, memberId)
                //removeMemberFromSprint(teamId, sprintId, memberId)

            });

            describe('currentViewState manipulations', function () {

                //changeCurrentTeamId(teamId)
                //changeExistingMemberId(memberId)
                //setCurrentSprintId(newCurSprintId)
                //moveCurrentSprintId(forward)

            });

            describe('sprint status update', function () {

                //retrofySprint(sprintId, teamId)
                //moveSprintToNextState(sprintId, teamId)

            });

        });


    }
);