define(['lodash', '../data/teams', './helpers'], function (_, defaultTeamData, helpers) {
    'use strict';
    var filterFunctions = {
        AllTeams: null
        //TeamById: function (id) {
        //    return {id: id};
        //}

    };

    function TeamStore(dispatcher) {
        var SPRINT_SCHEMA = {
                name: {type: 'string'},
                scrumMaster: {type: 'string', defaultValue: null},
                startDate: {type: 'string', defaultValue: null},
                endDate: {type: 'string', defaultValue: null},
                cardLifecycle: {type: 'string-array', defaultValue: []},
                members: {type: 'string-array', defaultValue: []},
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

        dispatcher.registerAction('ADD_TEAM', addTeam.bind(this));
        dispatcher.registerAction('ADD_SPRINT', addSprint.bind(this));

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
    }


    return TeamStore;
});