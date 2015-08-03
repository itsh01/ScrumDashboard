define([], function () {
    'use strict';
    return {
        actionNames: {
            UPDATE_CARD: 'UPDATE_CARD',
            ADD_CARD: 'ADD_CARD',
            REMOVE_CARD: 'REMOVE_CARD',

            ADD_MEMBER: 'ADD_MEMBER',
            UPDATE_MEMBER: 'UPDATE_MEMBER',
            DEACTIVATE_MEMBER: 'DEACTIVATE_MEMBER',
            MEMBER_DEACTIVATED: 'MEMBER_DEACTIVATED',

            ADD_TEAM: 'ADD_TEAM',
            ADD_SPRINT: 'ADD_SPRINT',
            CHANGE_CURRENT_TEAM: 'CHANGE_CURRENT_TEAM',
            RETROFY_SPRINT: 'RETROFY_SPRINT',
            MOVE_SPRINT_TO_NEXT_STATE: 'MOVE_SPRINT_TO_NEXT_STATE',


            PLANNING_ADD_CARD: 'PLANNING_ADD_CARD',
            PLANNING_DONE_ADDING_CARD: 'PLANNING_DONE_ADDING_CARD'

        },
        SPRINT_STATUS: {PLANNING: 0, IN_PROGRESS: 1, RETRO: 2}
    };
});