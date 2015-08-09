define([
        'lodash',
        '../store/teams',
        '../../constants',
    ],
    function (_, teamsStore, constants) {
        'use strict';

        function TeamsStoreActions(dispatcher) {

            return {
                addTeam: function (teamData) {
                    dispatcher.dispatch(constants.ADD_TEAM, teamData);
                },

                addSprint: function (teamId, sprintData) {
                    dispatcher.dispatch(constants.ADD_SPRINT, teamId, sprintData);
                },

                retrofySprint: function (sprintId, teamId) {
                    dispatcher.dispatch(constants.RETROFY_SPRINT, sprintId, teamId);
                },

                //addSprintToCurrentTeam(sprintData)
                //removeDeactivatedMemberFromTeams(memberId)
                addMemberToTeam: function (teamId, memberId) {
                    dispatcher.dispatch(constants.ADD_MEMBER_TO_TEAM, teamId, memberId);
                },

                removeMemberFromSingleTeam: function (teamId, memberId) {
                    dispatcher.dispatch(constants.REMOVE_MEMBER_FROM_TEAM, teamId, memberId);
                },

                changeCurrentTeamId: function (teamId) {
                    dispatcher.dispatch(constants.CHANGE_CURRENT_TEAM, teamId);
                },

                changeExistingMemberId: function (memberId) {
                    dispatcher.dispatch(constants.CHANGE_EXISTING_MEMBER, memberId);
                },

                // TODO: split into 3 functions
                changeCurrentSprintId: function (destination) {
                    dispatcher.dispatch(constants.CHANGE_CURRENT_SPRINT, destination);
                },

                moveSprintToNextState: function (sprintId, teamId) {
                    dispatcher.dispatch(constants.MOVE_SPRINT_TO_NEXT_STATE, sprintId, teamId);
                },

                retrofyCurrentSprint: function () {
                    dispatcher.dispatch(constants.RETROFY_CURRENT_SPRINT);
                },

                deactivateTeam: function (teamId) {
                    dispatcher.dispatch(constants.DEACTIVATE_TEAM, teamId);
                },

                updateSprint: function (sprintId, newSprintData, teamId) {
                    dispatcher.dispatch(constants.UPDATE_SPRINT, sprintId, newSprintData, teamId);
                },

                addMemberToSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch(constants.ADD_MEMBER_TO_SPRINT, teamId, sprintId, memberId);
                },

                removeMemberFromSingleSprint: function (teamId, sprintId, memberId) {
                    dispatcher.dispatch(constants.REMOVE_MEMBER_FROM_SPRINT, teamId, sprintId, memberId);
                },

                addSprintToCurrentTeam: function (sprintData) {
                    dispatcher.dispatch(constants.ADD_SPRINT_TO_CURRENT_TEAM, sprintData);
                }
            }
        }

        return TeamsStoreActions;
    });