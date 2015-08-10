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
            CREATE_MEMBER_INTO_TEAM: 'CREATE_MEMBER_INTO_TEAM',

            ADD_TEAM: 'ADD_TEAM',
            ADD_SPRINT: 'ADD_SPRINT',
            ADD_SPRINT_TO_CURRENT_TEAM: 'ADD_SPRINT_TO_CURRENT_TEAM',
            CHANGE_CURRENT_TEAM: 'CHANGE_CURRENT_TEAM',
            CHANGE_CURRENT_SPRINT: 'CHANGE_CURRENT_SPRINT',
            RETROFY_SPRINT: 'RETROFY_SPRINT',
            RETROFY_CURRENT_SPRINT: 'RETROFY_CURRENT_SPRINT',
            MOVE_SPRINT_TO_NEXT_STATE: 'MOVE_SPRINT_TO_NEXT_STATE',
            UPDATE_SPRINT: 'UPDATE_SPRINT',
            DEACTIVATE_TEAM: 'DEACTIVATE_TEAM',
            ADD_MEMBER_TO_TEAM: 'ADD_MEMBER_TO_TEAM',
            REMOVE_MEMBER_FROM_TEAM: 'REMOVE_MEMBER_FROM_TEAM',
            ADD_MEMBER_TO_SPRINT: 'ADD_MEMBER_TO_SPRINT',
            REMOVE_MEMBER_FROM_SPRINT: 'REMOVE_MEMBER_FROM_SPRINT',
            CHANGE_EXISTING_MEMBER: 'CHANGE_EXISTING_MEMBER',

            PLANNING_ADD_CARD: 'PLANNING_ADD_CARD',
            PLANNING_DONE_ADDING_CARD: 'PLANNING_DONE_ADDING_CARD',
            PLANNING_EDIT_CARD: 'PLANNING_EDIT_CARD'
        },
        flux: {
            CARDS_STORE_CHANGE: 'CARDS_STORE_CHANGE'
        },

        SPRINT_STATUS: {PLANNING: 0, IN_PROGRESS: 1, RETRO: 2},
        DATE_FORMAT: 'YYYY-MM-DD'
    };
});