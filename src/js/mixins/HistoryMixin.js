/**
 * Created by itaysh on 8/5/15.
 */

define([],
    function () {
        'use strict';

        return {
            mapHistoryToCards: function (history) {
                var card = this.context.newFlux.cardsStore.getCardById(history.cardId);
                card.assignee = history.assigneeId;
                card.status = history.status;

                return card;
            }
        };
    }
);