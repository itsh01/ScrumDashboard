define([
        '../../../vendor/lodash',
        'flux/helpers',
        '../../constants'
    ],
    function (_, helpers, constants) {
        'use strict';


        function MembersStore(dispatcher, eventEmitter, waitForTokens, defaultMembersData) {

            var dataFileVersion = '1',
                MEMBERS_SCHEMA = {
                    name: {type: 'string'},
                    image: {type: 'string', defaultValue: ''},
                    active: {type: 'boolean', defaultValue: true}
                },
                currentMembers;

            (function init() {
                this.emitChange = function () {
                    eventEmitter.emit(constants.flux.MEMBERS_STORE_CHANGE);
                };

                this.addChangeListener = function (callback) {
                    eventEmitter.on(constants.flux.MEMBERS_STORE_CHANGE, callback);
                };

                this.removeChangeListener = function (callback) {
                    eventEmitter.removeListener(constants.flux.MEMBERS_STORE_CHANGE, callback);
                };

                var filterFunctions = {
                    AllMembers: null
                };

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

            }).apply(this);

            this.getBlankMember = function () {
                return helpers.getBlankItem(MEMBERS_SCHEMA);
            };

            this.getMemberById = function getMemberById(id) {
                return _.find(currentMembers, {id: id});
            };

            this.getMembersByIdList = function (ids) {
                return _.map(ids, function (id) {
                    return this.getMemberById(id);
                }.bind(this));
            };

            this.getLastMemberAdded = function () {
                return _.cloneDeep(_.last(currentMembers));
            };

            function isValidMember(memberData) {
                return _.every(memberData, function (value, key) {
                    return helpers.isValidValue(value, key, MEMBERS_SCHEMA, 'Member Store');
                });
            }

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

            var actions = [
                {name: constants.actionNames.ADD_MEMBER, callback: addMember},
                {name: constants.actionNames.UPDATE_MEMBER, callback: updateMember},
                {name: constants.actionNames.DEACTIVATE_MEMBER, callback: deactivateMember},
                {name: constants.actionNames.CREATE_MEMBER_INTO_TEAM, callback: addMember}

            ];

            function getStoresQueue(actionStoreOrder) {
                var storeIndex = _.indexOf(actionStoreOrder, constants.storesName.MEMBERS_STORE);
                var storeOrder = _.slice(actionStoreOrder, 0, storeIndex);
                return _.map(storeOrder, function (storeName) {
                    return waitForTokens[storeName];
                });
            }

            waitForTokens[constants.storesName.MEMBERS_STORE] = dispatcher.register(function (payload) {
                var actionName = payload.actionName,
                    data = payload.payload,

                    action = _.find(actions, {name: actionName});

                if (action) {
                    var actionStoreOrder = payload.storeOrder;
                    if (actionStoreOrder && actionStoreOrder.length > 1) {
                        dispatcher.waitFor(getStoresQueue(actionStoreOrder));
                    }
                    action.callback.apply(this, data);
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

        }

        return MembersStore;
    });
