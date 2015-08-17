define([
        'lodash',
        'React',
        'components/sprint/Member',
        'components/sprint/TableCell',

        'mixins/HistoryMixin'
    ],
    function (_, React, SprintMember, TableCell, HistoryMixin) {
        'use strict';

        return React.createClass({
            displayName: 'SprintMemberRow',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                member: React.PropTypes.object,
                retro: React.PropTypes.array,
                sprintEndDate: React.PropTypes.string,
                sprintStartDate: React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [HistoryMixin],

            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done']
                };
            },

            onChange: function () {
                this.forceUpdate();
            },

            filterCardsByDate: function (cards) {
                function onSegment(startX, endX, x) {
                    return (x >= startX && x <= endX);
                }

                var startDate = new Date(this.props.sprintStartDate).valueOf(),
                    endDate = new Date(this.props.sprintEndDate).valueOf();
                return _.filter(cards, function (card) {
                    if (card.startDate === null) {
                        return true;
                    }
                    var cardStartDate = new Date(card.startDate).valueOf();
                    if (card.endDate === null) {
                        return (cardStartDate >= startDate && cardStartDate <= endDate);
                    }
                    var cardEndDate = new Date(card.endDate).valueOf();
                    return onSegment(startDate, endDate, cardStartDate) || onSegment(startDate, endDate, cardEndDate);
                });
            },

            getMemberCards: function (retro, memberId) {
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
                cards = this.filterCardsByDate(cards);
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
                    cards = this.getMemberCards(this.props.retro, member.id),
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