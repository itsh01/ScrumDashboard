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
                member: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done']
                };
            },
            render: function () {
                var memberId = this.props.member.id,
                    cards = this.context.flux.cardsStore.getUserCards(memberId),
                    cells = _.map(this.props.cardLifecycle, function (phase) {

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