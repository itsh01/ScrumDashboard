define([
        '../../constants'
    ],
    function (constants) {
        'use strict';

        function TeamsStoreActions(dispatcher) {

            return {
                addTeam: function (teamData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_TEAM, payload: [teamData]});
                },

                addSprint: function (teamId, sprintData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_SPRINT, payload: [teamId, sprintData]});
                },

                retrofySprint: function (sprintId, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.RETROFY_SPRINT, payload: [sprintId, teamId]});
                },

                addMemberToTeam: function (teamId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_MEMBER_TO_TEAM, payload: [teamId, memberId]});
                },

                removeMemberFromTeam: function (teamId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.REMOVE_MEMBER_FROM_TEAM, payload: [teamId, memberId]});
                },

                changeCurrentTeamId: function (teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_CURRENT_TEAM_ID, payload: [teamId]});
                },

                changeExistingMemberId: function (memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_EXISTING_MEMBER_ID, payload: [memberId]});
                },

                // TODO: split into 3 functions
                changeCurrentSprintId: function (destination) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_CURRENT_SPRINT_ID, payload: [destination]});
                },

                moveSprintToNextState: function (sprintId, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE, payload: [sprintId, teamId]});
                },

                deactivateTeam: function (teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.DEACTIVATE_TEAM, payload: [teamId]});
                },

                updateSprint: function (sprintId, newSprintData, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.UPDATE_SPRINT, payload: [sprintId, newSprintData, teamId]});
                },

                addMemberToSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_MEMBER_TO_SPRINT, payload: [teamId, sprintId, memberId]});
                },

                removeMemberFromSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.REMOVE_MEMBER_FROM_SPRINT, payload: [teamId, sprintId, memberId]});
                },

                addSprintToCurrentTeam: function (sprintData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_SPRINT_TO_CURRENT_TEAM, payload: [sprintData]});
                }
            };
        }

        return TeamsStoreActions;
    });