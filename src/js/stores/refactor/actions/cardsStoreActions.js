define([
        '../../../constants'
    ],
    function (constants) {
        'use strict';

        function cardsStoreActions(dispatcher) {

            return {
                updateCard: function (cardId, newCardData) {
                    dispatcher.dispatch(
                        constants.UPDATE_CARD,
                        cardId,
                        newCardData
                    );
                },

                addCard: function (newCardData) {
                    dispatcher.dispatch(
                        constants.ADD_CARD,
                        newCardData
                    );
                },

                removeCard: function (cardId) {
                    dispatcher.dispatch({
                        name: constants.REMOVE_CARD,
                        cardId: cardId
                    });

                }
            };
        }

        return cardsStoreActions;
    });