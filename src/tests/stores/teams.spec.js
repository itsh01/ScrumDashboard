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

            var firebaseURL = 'https://scrum-dashboard-test.firebaseio.com',
                mainFirebaseRef = new Firebase(firebaseURL),
                eventEmitter = new EventEmitter(),
                waitForTokens = {},
                dispatcher = new baseFlux.Dispatcher(),
                teamsActions, teamsStore, teamsArr,
                activeTeam, inactiveTeam, memberId, sprint;

            function getUserCards(userId) {
                return (userId === sprint.members[0].id) ? [{}] : null;
            }

            function removeEmptyObjects(item) {
                _.forEach(item, function (value, key) {
                    if (_.isArray(value) || _.isPlainObject(value)) {
                        if (_.isEmpty(value)) {
                            delete item[key];
                        } else if (_.isPlainObject(value)) {
                            removeEmptyObjects(item[key]);
                        }
                    }
                });
            }

            function copyItem(item) {
                var newItem = _.cloneDeep(item);
                if (item.id) {
                    newItem.id = helpers.generateGuid();
                }
                if (item.name) {
                    newItem.name = helpers.generateGuid();
                }
                if (item.members) {
                    newItem.members = [];
                    _.forEach(item.members, function () {
                        newItem.members.push(helpers.generateGuid());
                    });
                }
                if (item.sprints) {
                    newItem.sprints = [];
                    _.forEach(item.sprints, function (s) {
                        newItem.sprints.push(copyItem(s));
                    });
                }
                return newItem;
            }

            beforeEach(function () {

                memberId = helpers.generateGuid();

                sprint = {
                    id: helpers.generateGuid(),
                    name: helpers.generateGuid(),
                    scrumMaster: memberId,
                    startDate: '2015-08-24',
                    endDate: '',
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    members: [helpers.generateGuid()],
                    state: 0
                };

                activeTeam = {
                    members: [memberId],
                    active: true,
                    id: helpers.generateGuid(),
                    sprints: [sprint],
                    name: helpers.generateGuid()
                };

                inactiveTeam = copyItem(activeTeam);

                inactiveTeam.active = false;

                teamsArr = [activeTeam, inactiveTeam];

                teamsActions = new TeamsActions(dispatcher);

                var teamPars = {
                    dispatcher: dispatcher,
                    eventEmitter: eventEmitter,
                    waitForTokens: waitForTokens,
                    defaultTeamData: teamsArr,
                    getUserCards: getUserCards,
                    fireBaseURL: firebaseURL + '/teams'
                };

                mainFirebaseRef.set({teams: teamsArr});

                teamsStore = new TeamsStore(teamPars);
            });

            describe('basic getters', function () {

                describe('getTeamById', function () {

                    it('should return a team clone by team id', function () {
                        var actualTeam = teamsStore.getTeamById(activeTeam.id);
                        expect(actualTeam).toEqual(activeTeam);
                        delete actualTeam.name;
                        expect(actualTeam.name).not.toEqual(activeTeam.name);
                    });

                    it('should return undefined if no team found', function () {
                        expect(teamsStore.getTeamById('not-existent-id')).toBe(undefined);
                    });
                });

                describe('getSprintById', function () {

                    it('should return a sprint clone by sprint id', function () {
                        var actualSprint = teamsStore.getSprintById(sprint.id);
                        expect(actualSprint).toEqual(sprint);
                        delete actualSprint.name;
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
                        var validTeamData = copyItem(activeTeam);
                        delete validTeamData.sprints;
                        delete validTeamData.id;
                        teamsActions.addTeam(validTeamData);
                        validTeam = _.filter(teamsStore.getAllTeams(), {name: validTeamData.name})[0];
                    });

                    it('should add a new team if team data is valid', function () {
                        expect(validTeam).toBeDefined();
                    });

                    it('should append a blank sprint to newly created team', function () {
                        delete validTeam.sprints[0].id;
                        var blankSprint = teamsStore.getBlankSprint();
                        removeEmptyObjects(blankSprint);
                        expect(validTeam.sprints).toEqual([blankSprint]);
                    });

                    it('should not add a new team if team data is invalid', function () {
                        teamsActions.addTeam({invalid: true});
                        var updatedTeam = _.filter(teamsStore.getAllTeams(), {invalid: true});
                        expect(updatedTeam).toEqual([]);
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
                            var addedSprint = _.find(teamsStore.getTeamById(activeTeam.id).sprints, {name: validSprint.name});
                            delete addedSprint.id;
                            expect(addedSprint).toEqual(validSprint);
                        }

                        beforeEach(function () {
                            validSprint = copyItem(sprint);
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
                            invalidSprint = copyItem(sprint);
                            invalidSprint.illegalKey = 'illegal';
                        });

                        it('should not add sprint to team with specified id', function () {
                            teamsActions.addSprint(invalidSprint, activeTeam.id);
                            expect(allSprints).toEqual(teamsStore.getTeamById(activeTeam.id).sprints);
                        });

                        it('should not add sprint to current team if team id is not provided', function () {
                            teamsActions.addSprint(invalidSprint);
                            expect(allSprints).toEqual(teamsStore.getTeamById(activeTeam.id).sprints);
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
                        var membersArr = teamsStore.getTeamById(activeTeam.id).members;
                        teamsActions.addMemberToTeam(activeTeam.id, memberId);
                        expect(teamsStore.getTeamById(activeTeam.id).members).toEqual(membersArr);
                    });

                });

                describe('removeMemberFromTeam', function () {

                    it('should remove member id from members of team with specified id if the team is active', function () {
                        teamsActions.removeMemberFromTeam(activeTeam.id, memberId);
                        expect(teamsStore.getTeamById(activeTeam.id).members).not.toContain(memberId);
                    });

                    it('should not remove member id from members of team with specified id if the team is inactive', function () {
                        var mid = inactiveTeam.members[0];
                        teamsActions.removeMemberFromTeam(inactiveTeam.id, mid);
                        expect(teamsStore.getTeamById(inactiveTeam.id).members).toContain(mid);
                    });

                    it('should do nothing if the member does not exist', function () {
                        var membersArr = teamsStore.getTeamById(activeTeam.id).members;
                        teamsActions.removeMemberFromTeam(activeTeam.id, 'not-existent-id');
                        expect(teamsStore.getTeamById(activeTeam.id).members).toEqual(membersArr);
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

                    var allSprintsOfActiveTeam;

                    beforeEach(function () {
                        allSprintsOfActiveTeam = teamsStore.getTeamById(activeTeam.id).sprints;
                    });

                    describe('valid sprint data supplied', function () {

                        var validSprintData;

                        beforeEach(function () {
                            validSprintData = {
                                name: helpers.generateGuid(),
                                startDate: '2015-08-23',
                                endDate: '',
                                retroCardsStatus: [],
                                state: 1,
                                scrumMaster: helpers.generateGuid(),
                                cardLifecycle: ['Start', 'End'],
                                members: [helpers.generateGuid()]
                            };
                        });

                        function test(teamId) {
                            teamsActions.updateSprint(sprint.id, validSprintData, teamId);
                            var updatedTeam = teamsStore.getTeamById(activeTeam.id);
                            var updatedSprint = _.find(updatedTeam.sprints, {id: sprint.id});
                            expect(validSprintData.name).toEqual(updatedSprint.name);
                            expect(allSprintsOfActiveTeam.length).toBe(updatedTeam.sprints.length);
                        }

                        it('should update sprint if team id is not specified', function () {
                            test();
                        });

                        it('should update sprint if team id is specified', function () {
                            test(activeTeam.id);
                        });

                    });

                    describe('invalid sprint data supplied', function () {

                        function test(teamId) {
                            teamsActions.updateSprint(sprint.id, {invalid: 'invalid'}, teamId);
                            var updatedTeam = teamsStore.getTeamById(activeTeam.id);
                            var updatedSprint = _.find(updatedTeam.sprints, {id: sprint.id});
                            expect(updatedSprint.invalid).not.toBeDefined();
                            expect(allSprintsOfActiveTeam.length).toBe(updatedTeam.sprints.length);
                        }

                        it('should not update sprint if team id is not specified', function () {
                            test();
                        });

                        it('should not update sprint if team id is specified', function () {
                            test(activeTeam.id);
                        });
                    });

                });

                describe('addMemberToSprint', function () {

                    var newMemberId;

                    beforeEach(function () {
                        newMemberId = helpers.generateGuid();
                    });


                    it('should add a new member to sprint if team is active', function () {
                        teamsActions.addMemberToSprint(activeTeam.id, activeTeam.sprints[0].id, newMemberId);
                        var updatedSprint = teamsStore.getSprintById(activeTeam.sprints[0].id);
                        expect(updatedSprint.members).not.toContain(newMemberId);
                        expect(activeTeam.sprints[0].members.length).toBe(updatedSprint.members.length);
                    });

                    it('should not add a new member to sprint if team is inactive', function () {
                        teamsActions.addMemberToSprint(inactiveTeam.id, inactiveTeam.sprints[0].id, newMemberId);
                        var updatedSprint = teamsStore.getSprintById(inactiveTeam.sprints[0].id);
                        expect(updatedSprint.members).not.toContain(newMemberId);
                        expect(inactiveTeam.sprints[0].members.length).toBe(updatedSprint.members.length);
                    });
                });

            });

        });


    }
);