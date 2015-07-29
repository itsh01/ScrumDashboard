define(['lodash', '../data/members'], function (_, defaultMembersData) {
    function MembersStore() {
        var currentMembers = defaultMembersData;

        this.getAllMembers = function () {
            return _.cloneDeep(currentMembers);
        };

        // This is an example of how to use data mutating functions
        this.addMember = function (newMemberData) {
            currentMembers.push(newMemberData);
            // trigger re-render on main component
        };

        this.handleAction = function(actionName, actionData) {
            switch (actionName) {
                case 'ADD_MEMBER': this.addMember(actionData);
                    break;
            }
        }
    }

    return MembersStore

});