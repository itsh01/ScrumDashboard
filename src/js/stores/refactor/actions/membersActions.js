define([
        'lodash',
        '../../../constants'
    ],
    function (_, constants) {
        'use strict';

        function MembersStoreActions(dispatcher) {

            return {
                addMember: function (newMemberData) {
                    dispatcher.dispatch(constants.ADD_MEMBER, newMemberData);
                },
                updateMember: function (memberId, newMemberData) {
                    dispatcher.dispatch(constants.UPDATE_MEMBER, memberId, newMemberData);
                },
                deactivateMember: function (memberId) {
                    dispatcher.dispatch(constants.DEACTIVATE_MEMBER, memberId);
                },
                createMemberIntoTeam: function (memberData, teamId) {
                    dispatcher.dispatch(constants.CREATE_MEMBER_INTO_TEAM, memberData, teamId);
                }
            };
        }


        return MembersStoreActions;
    });