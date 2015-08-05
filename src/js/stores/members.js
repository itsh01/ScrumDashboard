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
            var dataFileVersion = 1,
                MEMBERS_SCHEMA = {
                    name: {type: 'string'},
                    image: {type: 'string', defaultValue: ''},
                    active: {type: 'boolean', defaultValue: true}
                },
                currentMembers;

            if (dataFileVersion === localStorage.getItem('membersVersion')) {
                currentMembers = restoreFromLocalStorage();
            }else {
                currentMembers = defaultMembersData;
                saveToLocalStorage();
                localStorage.setItem('membersVersion', dataFileVersion);
            }


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
                    saveToLocalStorage();
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
                saveToLocalStorage();
                dispatcher.dispatchAction(constants.actionNames.MEMBER_DEACTIVATED, memberId);
                return true;
            }

            function updateMember(memberId, newMemberData) {
                if (isValidMember(newMemberData)) {
                    var didUpdate = helpers.updateItem(currentMembers, memberId, newMemberData, 'Member Store');
                    saveToLocalStorage();
                    return didUpdate;
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


            function saveToLocalStorage() {
                helpers.saveToLocalStorage('members', currentMembers);
            }

            function restoreFromLocalStorage() {
                return helpers.restoreFromLocalStorage('members');
            }

            /*eslint-disable no-unused-vars */
            function removeFromLocalStorage() {
                helpers.removeFromLocalStorage('members');
            }
            /*eslint-enable no-unused-vars */

            var actions = [
                {name: constants.actionNames.ADD_MEMBER, callback: addMember},
                {name: constants.actionNames.UPDATE_MEMBER, callback: updateMember},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: deactivateMember}
            ];
            _.forEach(actions, function (action) {
                dispatcher.registerAction(action.name, action.callback.bind(this));
            }.bind(this));
        }

        return MembersStore;
    });