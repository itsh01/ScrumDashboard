define([
        '../../../constants'
    ],
    function (constants) {
        'use strict';

        function cardsStoreActions(dispatcher) {

            return {
                planningAddCard: function (card) {
                    dispatcher.dispatch(constants.PLANNING_ADD_CARD, card);
                },

                planningDoneAddingCard: function (card) {
                    dispatcher.dispatch(constants.PLANNING_DONE_ADDING_CARD, card);
                },

                editCard: function (card) {
                    dispatcher.dispatch(constants.PLANNING_EDIT_CARD, card);
                }
            };
        }

        return cardsStoreActions;
    });