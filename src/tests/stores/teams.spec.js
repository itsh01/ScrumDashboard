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

            var team, sprint, teamsData, teamsStore, eventEmitter, waitForTokens, dispatcher;


            beforeEach(function () {
                localStorage.clear();

                eventEmitter = new EventEmitter();
                waitForTokens = {};
                dispatcher = new baseFlux.Dispatcher();

            });

            describe('basic getters: getTeamById, getSprintById, getBlankTeam, getBlankSprint', function () {

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
                        retroCardsStatus: null
                    };

                    team = {
                        members: [memberId],
                        active: true,
                        filterFunc: null,
                        id: teamId,
                        sprints: [sprint],
                        name: teamName
                    };

                    teamsData = [team];
                    teamsStore = new TeamsStore(dispatcher, eventEmitter, waitForTokens, teamsData);

                });

                describe('getTeamById', function () {

                    it('should return a team clone by id', function () {
                        var actualTeam = teamsStore.getTeamById(teamId);
                        expect(actualTeam).toEqual(team);
                        actualTeam.name = 'a new name';
                        expect(actualTeam.name).not.toEqual(team.name);
                    });

                    it('should return undefined if no team found', function () {
                        expect(teamsStore.getTeamById('not-existent-id')).toBe(undefined);
                    });
                });

                describe('getSprintById', function () {

                    it('should return a sprint clone by id', function () {
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

                    it('should return all teams including inactive', function () {

                    });
                });

                describe('getAllActiveTeams', function () {

                    it('should return all active teams', function () {

                    });
                });
            });

            describe('basic setters', function () {


            });

            describe('currentViewState manipulations', function () {


            });

            describe('input validation', function () {


            });

            describe('sprint status update', function () {


            });

        });


    });