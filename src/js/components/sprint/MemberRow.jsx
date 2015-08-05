define([
        'lodash',
        'React',
        'components/sprint/Member',
        'components/sprint/TableCell'
    ],
    function (_, React, SprintMember, TableCell) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Member Row',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                member: React.PropTypes.object,
                retro: React.PropTypes.array
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done']
                };
            },

            mapHistoryToCards: function (history) {
                var card = this.context.flux.cardsStore.getCardById(history.cardId);
                card.assignee = history.assigneeId;
                card.status = history.status;

                return card;
            },

            render: function () {
                var retro = this.props.retro;
                var memberId = this.props.member.id,
                    cards = [],
                    cells = [];

                if (retro) {
                    cards = _(retro)
                        .filter(function (history) {
                            return history.assigneeId === memberId;
                        })
                        .map(this.mapHistoryToCards)
                        .value();
                } else {
                    cards = this.context.flux.cardsStore.getUserCards(memberId);
                }

                cells = _.map(this.props.cardLifecycle, function mapPhasesToTableCells(phase) {

                    var phaseCards = _.filter(cards, function filterCardsByPhase(card) {
                        return card.status === phase;
                    });

                    return (
                        <TableCell
                            key={phase}
                            cards={phaseCards}
                            assignee={memberId}
                            status={phase} />
                    );

                }, this);

                return (<div className="table-row">
                    <div className="table-cell sprint-member-cell">
                        <SprintMember
                            key={memberId}
                            member={this.props.member} />
                    </div>
                    {cells}
                </div>);
            }
        });
    }
);