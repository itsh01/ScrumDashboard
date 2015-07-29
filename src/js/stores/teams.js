define(['lodash', '../data/teams'], function (_, defaultTeamData) {

    function TeamStore() {
        var currentTeam = defaultTeamData;
        this.getAllTeams = function () {
            return _.cloneDeep(currentTeam);
        };

        // This is an example of how to use data mutating functions
        this.addTeam = function (newTeamData) {
            currentTeam.push(newTeamData);
            // trigger re-render on main component
        };

        this.handleAction = function(actionName, actionData) {
            switch (actionName) {
                case 'ADD_MEMBER': this.addCard(actionData);
                    break;
            }
        };
    }

    return TeamStore
});