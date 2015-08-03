define([
        'lodash',
        '../data/members',
        './helpers',
        '../constants'
    ],
    function (_, defaultMembersData, helpers, constants) {
        'use strict';
        var filterFunctions = {
            AllMembers: null
        };

        function MembersStore(dispatcher) {
            var MEMBERS_SCHEMA = {
                    name: {type: 'string'},
                    image: {type: 'string', defaultValue: ''},
                    active: {type: 'boolean', defaultValue: true}
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

            function deactivateMember(memberId) {
                var member = _.find(currentMembers, {id: memberId});
                if (_.isEmpty(member)) {
                    console.log('Member Store: attempt to remove non existent member (id:', memberId, ')');
                    return false;
                }
                member.active = false;
                dispatcher.dispatchAction(constants.actionNames.MEMBER_DEACTIVATED, memberId);
                return true;
            }

            function updateMember(memberId, newMemberData) {
                if (isValidMember(newMemberData)) {
                    return helpers.updateItem(currentMembers, memberId, newMemberData, 'Member Store');
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

            dispatcher.registerAction(constants.actionNames.ADD_MEMBER, addMember.bind(this));
            dispatcher.registerAction(constants.actionNames.UPDATE_MEMBER, updateMember.bind(this));
            dispatcher.registerAction(constants.actionNames.DEACTIVATE_MEMBER, deactivateMember.bind(this));

        }

        return MembersStore;
    });