define([
        '../../constants'
    ],
    function (constants) {
        'use strict';

        function MembersActions(dispatcher, getLastMemberAdded) {

            return {
                addMember: function (newMemberData) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.ADD_MEMBER,
                        payload: [newMemberData]
                    });
                },
                updateMember: function (memberId, newMemberData) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.UPDATE_MEMBER,
                        payload: [memberId, newMemberData]
                    });
                },
                deactivateMember: function (memberId) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.DEACTIVATE_MEMBER,
                        payload: [memberId]
                    });
                },
                // if you can read this MDN has left her computer unlocked.
                createMemberIntoTeam: function (memberData, teamId) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.CREATE_MEMBER_INTO_TEAM,
                        payload: [memberData, teamId],
                        storeOrder: [constants.storesName.MEMBERS_STORE, constants.storesName.TEAMS_STORE]
                    });
                }
            };
        }

        return MembersActions;
    });