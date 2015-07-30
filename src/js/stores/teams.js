define(['lodash', '../data/teams'], function (_, defaultTeamData) {
    'use strict';
    var filterFunctions = {
        AllTeams: null
        //TeamById: function (id) {
        //    return {id: id};
        //}

    };

    function TeamStore(dispatcher) {
        var currentTeam = defaultTeamData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentTeam, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        this.getTeamById = function (id) {
            return _.cloneDeep(_.find(currentTeam, {id: id}));
        };
        function addTeam(teamData) {
            currentTeam.push(teamData);
        }

        dispatcher.registerAction('ADD_TEAM', addTeam.bind(this));
    }

    return TeamStore;
});