define([
        '../../constants'
    ],
    function (constants) {
        'use strict';

        function cardsActions(dispatcher) {

            return {
                updateCard: function (cardId, newCardData) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.UPDATE_CARD,
                        payload: [cardId, newCardData]
                    });
                },

                addCard: function (newCardData) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.ADD_CARD,
                        payload: [newCardData]
                    });
                },

                removeCard: function (cardId) {
                    dispatcher.dispatch({
                        actionName: constants.actionNames.REMOVE_CARD,
                        payload: [cardId]
                    });

                }
            };
        }

        return cardsActions;
    });