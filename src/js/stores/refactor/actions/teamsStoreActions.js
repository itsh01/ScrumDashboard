define([
        '../../../constants'
    ],
    function (constants) {
        'use strict';

        function teamsStoreActions(dispatcher) {

            return {
                addTeam: function (teamData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_TEAM, arguments: [teamData]});
                },

                addSprint: function (teamId, sprintData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_SPRINT, arguments: [teamId, sprintData]});
                },

                retrofySprint: function (sprintId, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.RETROFY_SPRINT, arguments: [sprintId, teamId]});
                },

                addMemberToTeam: function (teamId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_MEMBER_TO_TEAM, arguments: [teamId, memberId]});
                },

                removeMemberFromTeam: function (teamId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.REMOVE_MEMBER_FROM_TEAM, arguments: [teamId, memberId]});
                },

                changeCurrentTeamId: function (teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_CURRENT_TEAM_ID, arguments: [teamId]});
                },

                changeExistingMemberId: function (memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_EXISTING_MEMBER_ID, arguments: [memberId]});
                },

                // TODO: split into 3 functions
                changeCurrentSprintId: function (destination) {
                    dispatcher.dispatch({actionName: constants.actionNames.CHANGE_CURRENT_SPRINT_ID, arguments: [destination]});
                },

                moveSprintToNextState: function (sprintId, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE, arguments: [sprintId, teamId]});
                },

                retrofyCurrentSprint: function () {
                    dispatcher.dispatch({actionName: constants.actionNames.RETROFY_CURRENT_SPRINT});
                },

                deactivateTeam: function (teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.DEACTIVATE_TEAM, arguments: [teamId]});
                },

                updateSprint: function (sprintId, newSprintData, teamId) {
                    dispatcher.dispatch({actionName: constants.actionNames.UPDATE_SPRINT, arguments: [sprintId, newSprintData, teamId]});
                },

                addMemberToSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_MEMBER_TO_SPRINT, arguments: [teamId, sprintId, memberId]});
                },

                removeMemberFromSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch({actionName: constants.actionNames.REMOVE_MEMBER_FROM_SPRINT, arguments: [teamId, sprintId, memberId]});
                },

                addSprintToCurrentTeam: function (sprintData) {
                    dispatcher.dispatch({actionName: constants.actionNames.ADD_SPRINT_TO_CURRENT_TEAM, arguments: [sprintData]});
                }
            }
        }

        return teamsStoreActions;
    });