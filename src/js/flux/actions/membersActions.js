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
                    var previousLastMember = getLastMemberAdded().id;

                    // TODO: This is ugly I know, still working on it.
                    dispatcher.dispatch({
                        actionName: constants.actionNames.ADD_MEMBER,
                        payload: [memberData, teamId]
                    });

                    var newMemberId = getLastMemberAdded().id;

                    if (newMemberId !== previousLastMember.id) {
                        dispatcher.dispatch({
                            actionName: constants.actionNames.ADD_MEMBER_TO_TEAM,
                            payload: [teamId, newMemberId]
                        });
                    }
                }
            };
        }

        return MembersActions;
    });