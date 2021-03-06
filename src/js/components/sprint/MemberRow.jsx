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
                sprintId: React.PropTypes.string
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

            getMemberCards: function (retro, memberId) {
                var cards = [];
                if (!_.isEmpty(retro)) {
                    cards = _(retro)
                        .filter(function (history) {
                            return history.assigneeId === memberId;
                        })
                        .map(this.mapHistoryToCards)
                        .value();
                } else {
                    cards = this.context.flux.teamsStore.getMemberCardsInSprint(memberId, this.props.sprintId);
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