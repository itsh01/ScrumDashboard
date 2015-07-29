define(['lodash', '../data/teams'], function (_, defaultTeamData) {
    'use strict';
    var filterFunctions = {
        AllTeams: null,
        TeamById: function (id) {
            return {team: id};
        }
    };

    function TeamStore() {
        var currentTeam = defaultTeamData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentTeam, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        this.handleAction = function (actionName, actionData) {
            switch (actionName) {
                case 'ADD_MEMBER': this.addCard(actionData);
                    break;
            }
        };
    }

    return TeamStore;
});