define([
        '../../../constants'
    ],
    function (constants) {
        'use strict';

        function cardsStoreActions(dispatcher) {

            return {
                planningAddCard: function (card) {
                    dispatcher.dispatch({actionName: constants.actionNames.PLANNING_ADD_CARD, arguments: [card]});
                },

                planningDoneAddingCard: function (card) {
                    dispatcher.dispatch({actionName: constants.actionNames.PLANNING_DONE_ADDING_CARD, arguments: [card]});
                },

                editCard: function (card) {
                    dispatcher.dispatch({actionName: constants.actionNames.PLANNING_EDIT_CARD, arguments: [card]});
                }
            };
        }

        return cardsStoreActions;
    });