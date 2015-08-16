define([
        '../../../constants'
    ],
    function (constants) {
        'use strict';

        function cardsStoreActions(dispatcher) {

            return {
                planningAddCard: function (card) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.PLANNING_ADD_CARD,
                        payload: [card]});
                },

                planningDoneAddingCard: function (card) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.PLANNING_DONE_ADDING_CARD,
                        payload: [card]});
                },

                editCard: function (card) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.PLANNING_EDIT_CARD,
                        payload: [card]});
                }
            };
        }

        return cardsStoreActions;
    });