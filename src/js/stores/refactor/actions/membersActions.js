define([
        'constants'
    ],
    function (constants) {
        'use strict';

        function MembersActions(dispatcher) {

            return {
                addMember: function (newMemberData) {
                    dispatcher.dispatch({
                        actionNames: constants.actionNames.ADD_MEMBER,
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
                        actionNames: constants.actionNames.DEACTIVATE_MEMBER,
                        payload: [memberId]
                    });
                },
                createMemberIntoTeam: function (memberData, teamId) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.CREATE_MEMBER_INTO_TEAM,
                        payload: [memberData, teamId]
                    });
                }
            };
        }

        return MembersActions;
    });