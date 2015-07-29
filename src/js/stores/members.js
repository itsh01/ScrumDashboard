define(['lodash', '../data/members'], function (_, defaultMembersData) {
    'use strict';
    var filterFunctions = {
        AllMembers: null
    };

    function MembersStore() {
        var currentMembers = defaultMembersData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentMembers, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        // This is an example of how to use data mutating functions
        this.addMember = function (newMemberData) {
            currentMembers.push(newMemberData);
        };

        this.handleAction = function (actionName, actionData) {
            switch (actionName) {
                case 'ADD_MEMBER': this.addMember(actionData);
                    break;
            }
        };
    }

    return MembersStore;

});