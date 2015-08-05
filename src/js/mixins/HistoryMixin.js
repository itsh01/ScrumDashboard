/**
 * Created by itaysh on 8/5/15.
 */

define(['lodash'],
    function (_) {
        'use strict';

        return {
            mapHistoryToCards: function (history) {
                var card = this.context.flux.cardsStore.getCardById(history.cardId);
                card.assignee = history.assigneeId;
                card.status = history.status;

                return card;
            }
        };
    }
);