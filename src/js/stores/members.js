define(['lodash', '../data/members'], function (_, defaultMembersData) {
    'use strict';
    var filterFunctions = {
        AllMembers: null
    };

    function MembersStore(dispatcher) {
        var currentMembers = defaultMembersData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentMembers, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        // This is an example of how to use data mutating functions
        function addMember(newMemberData) {
            currentMembers.push(newMemberData);
        }

        this.getMemberById = function getMemberById(id) {
            return _.find(currentMembers, {id: id});
        };

        dispatcher.registerAction('ADD_MEMBER', addMember.bind(this));
    }

    return MembersStore;
});