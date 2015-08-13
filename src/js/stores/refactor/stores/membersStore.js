define([
        'lodash',
        '../../../data/members',
        '../../helpers',
        '../../../constants'
    ],
    function (_, defaultMembersData, helpers, constants) {
        'use strict';
        var filterFunctions = {
            AllMembers: null
        };

        function MembersStore(dispatcher, eventEmitter) {

            this.emitChange = function() {
                eventEmitter.emit(constants.flux.MEMBERS_STORE_CHANGE);
            };

            this.addChangeListener = function (callback) {
                eventEmitter.on(constants.flux.MEMBERS_STORE_CHANGE, callback);
            };

            this.removeChangeListener = function (callback) {
                eventEmitter.removeListener(constants.flux.MEMBERS_STORE_CHANGE, callback);
            };

            var dataFileVersion = '1',
                MEMBERS_SCHEMA = {
                    name: {type: 'string'},
                    image: {type: 'string', defaultValue: ''},
                    active: {type: 'boolean', defaultValue: true}
                },
                currentMembers;

            if (dataFileVersion === localStorage.getItem('membersVersion')) {
                currentMembers = restoreFromLocalStorage();
            } else {
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
                return true;
            }

            function updateMember(memberId, newMemberData) {
                delete newMemberData.id;
                if (isValidMember(newMemberData)) {
                    var didUpdate = helpers.updateItem(currentMembers, memberId, newMemberData, 'Member Store');
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

            function createMemberIntoTeam(memberData, teamId) {
                var newMemberId = addMember.call(this, memberData);
                // TODO: change
                dispatcher.dispatch(constants.actionNames.ADD_MEMBER_TO_TEAM, teamId, newMemberId);
            }

            var actions = [
                {name: constants.actionNames.ADD_MEMBER, callback: addMember},
                {name: constants.actionNames.UPDATE_MEMBER, callback: updateMember},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: deactivateMember},
                {name: constants.actionNames.CREATE_MEMBER_INTO_TEAM, callback: createMemberIntoTeam}
            ];

            this.dispatchToken = dispatcher.register(function (action) {

                var actionName = [].shift.apply(arguments),
                    payload = arguments,
                    action = _.find(actions, {name: actionName});

                if (action) {
                    action.callback.apply(this, payload);
                    saveToLocalStorage();
                    this.emitChange();
                }
            }.bind(this));


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

        }

        return MembersStore;
    });