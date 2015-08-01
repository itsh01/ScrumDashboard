define(['lodash', '../data/members', './helpers'], function (_, defaultMembersData, helpers) {
    'use strict';
    var filterFunctions = {
        AllMembers: null
    };

    function MembersStore(dispatcher) {
        var MEMBERS_SCHEMA = {
                name: {type: 'string', writable: false},
                image: {type: 'string', defaultValue: '', writable: true},
                active: {type: 'boolean', defaultValue: true, writable: true}
            },
            currentMembers = defaultMembersData;
        _.forEach(filterFunctions, function (filterVal, filterFuncName) {
            this['get' + filterFuncName] = function () {
                return _.filter(currentMembers, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
            };
        }, this);

        function isValidMember(memberData) {
            return _.every(memberData, function (value, key) {
                return helpers.isValidValue(value, key, MEMBERS_SCHEMA, 'Member Store');
            });
        }

        this.getBlankMember = function () {
            return helpers.getBlankItem(MEMBERS_SCHEMA);
        };

        function addMember(newMemberData) {
            var blankMember = this.getBlankMember(),
                memberWithDefaults = _.assign(blankMember, newMemberData);
            if (isValidMember(memberWithDefaults)) {
                memberWithDefaults.id = helpers.generateGuid();
                currentMembers.push(memberWithDefaults);
                return memberWithDefaults.id;
            }
        }

        function removeMember(memberId) {
            var member = _.find(currentMembers, {id: memberId});
            if (_.isEmpty(member)) {
                console.log('Member Store: attempt to remove non existent member (id:', memberId, ')');
                return false;
            }
            member.active = false;
            return true;
        }

        function updateMember(memberId, newMemberData) {
            if (isValidMember(newMemberData)) {
                return helpers.updateItem(currentMembers, memberId, newMemberData, MEMBERS_SCHEMA, 'Member Store');
            }
            return false;
        }

        this.getMemberById = function getMemberById(id) {
            return _.find(currentMembers, {id: id});
        };

        this.getMembersByIdList = function (ids) {
            return _.map(ids, function (id) {
                return this.getMemberById(id);
            }.bind(this));
        };

        dispatcher.registerAction('ADD_MEMBER', addMember.bind(this));
        dispatcher.registerAction('UPDATE_MEMBER', updateMember.bind(this));
        dispatcher.registerAction('REMOVE_MEMBER', removeMember.bind(this));

        this.test = function () {
            var nonExistentId = 'non-existent-id',
                existentId = '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                self = this,
                members = [
                { // all data supplied
                    name: 'A',
                    image: 'link',
                    active: true
                },
                {
                    name: 'B'
                },
                { // attempt to set id
                    name: 'C',
                    id: '123',
                    image: 'link',
                    active: true
                },
                { // illegal value
                    name: 'D',
                    active: 'false'
                }
            ];
            console.log('Test add/remove/update Member...');
            _.forEach(members, function (member) {
                addMember.call(self, member);
                updateMember.call(self, existentId, member);
                updateMember.call(self, nonExistentId, member);
            });
            removeMember.call(self, existentId);
            removeMember.call(self, nonExistentId);
            console.log('Test add/remove/update Member... done\n\n');
        };
    }

    return MembersStore;
});