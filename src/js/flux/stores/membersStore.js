define([
        '../../../vendor/lodash',
        'flux/helpers',
        '../../constants',
        'Firebase'
    ],
    function (_, helpers, constants, Firebase) {
        'use strict';

        function MembersStore(membersPars) {

            //var dataFileVersion = '1';
            var loading = true;
            this.getIsLoading = function () {
                return loading;
            };
            var MEMBERS_SCHEMA = {
                    name: {type: 'string'},
                    image: {type: 'string', defaultValue: ''},
                    active: {type: 'boolean', defaultValue: true}
                },
                currentMembers = membersPars.defaultMembersData,
                MembersFirebaseRef = new Firebase(membersPars.fireBaseURL);

            (function init() {
                // Listen to Firebase changes
                MembersFirebaseRef.on('value', function (snapshot) {
                    currentMembers = snapshot.val();
                    loading = false;
                    membersPars.eventEmitter.emit(constants.flux.MEMBERS_STORE_CHANGE);
                });

                this.emitChange = function () {
                    membersPars.eventEmitter.emit(constants.flux.MEMBERS_STORE_CHANGE);
                };

                this.addChangeListener = function (callback) {
                    membersPars.eventEmitter.on(constants.flux.MEMBERS_STORE_CHANGE, callback);
                };

                this.removeChangeListener = function (callback) {
                    membersPars.eventEmitter.removeListener(constants.flux.MEMBERS_STORE_CHANGE, callback);
                };

                var filterFunctions = {};

                _.forEach(filterFunctions, function (filterVal, filterFuncName) {
                    this['get' + filterFuncName] = function () {
                        return _.filter(currentMembers, _.isFunction(filterVal) ? filterVal.apply(this, arguments) : filterVal);
                    };
                }, this);

            }).apply(this);

            this.getAllMembers = function () {
                return currentMembers;
            };


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
                    return membersPars.waitForTokens[storeName];
                });
            }

            membersPars.waitForTokens[constants.storesName.MEMBERS_STORE] = membersPars.dispatcher.register(function (payload) {
                var actionName = payload.actionName,
                    data = payload.payload,

                    action = _.find(actions, {name: actionName});

                if (action) {
                    var actionStoreOrder = payload.storeOrder;
                    if (actionStoreOrder && actionStoreOrder.length > 1) {
                        membersPars.dispatcher.waitFor(getStoresQueue(actionStoreOrder));
                    }
                    action.callback.apply(this, data);
                    saveToFirebase();
                    this.emitChange();
                }
            }.bind(this));


            function saveToFirebase() {
                MembersFirebaseRef.set(currentMembers);
            }

            //function saveToLocalStorage() {
            //    helpers.saveToLocalStorage('members', currentMembers);
            //}
            //
            //function restoreFromLocalStorage() {
            //    return helpers.restoreFromLocalStorage('members');
            //}

        }

        return MembersStore;
    });
