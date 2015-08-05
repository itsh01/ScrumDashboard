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

            getMemberRetroCards: function (retro, memberId) {
                var cards = [];
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
                return cards;
            },
            createCellByCard: function (cards) {
                return _.map(this.props.cardLifecycle, function mapPhasesToTableCells(phase) {

                    var phaseCards = _.filter(cards, function filterCardsByPhase(card) {
                        return card.status === phase;
                    });

                    return (
                        <TableCell
                            key={phase}
                            cards={phaseCards}
                            assignee={this.props.member.id}
                            status={phase}/>
                    );

                }, this);
            }, render: function () {
                var member = this.props.member,
                    cards = this.getMemberRetroCards(this.props.retro, member.id),
                    cells = this.createCellByCard(cards);

                return (<div className="table-row">
                    <div className="table-cell sprint-member-cell">
                        <SprintMember
                            key={member.id}
                            member={member} />
                    </div>
                    {cells}
                </div>);
            }
        });
    }
);