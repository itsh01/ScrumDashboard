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
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    member: {
                        id: 1,
                        name: 'John Doe',
                        image: 'http://icons.iconarchive.com/icons/sora-meliae/matrilineare/128/avatar-default-icon.png'
                    }
                };
            },
            render: function () {
                var cards = this.context.flux.cardsStore.getUserCards(this.props.member.id),
                    cells = _.map(this.props.cardLifecycle, function (phase) {

                        var phaseCards = _.filter(cards, function (card) {
                            return card.status === phase;
                        });

                        return (
                            <TableCell
                                key={phase}
                                cards={phaseCards}
                                assignee={this.props.member.id}
                                status={phase} />
                        );

                    }, this);
                return (<div className="table-row">
                    <div className="table-cell sprint-member-cell">
                        <SprintMember
                            key={this.props.member.id}
                            member={this.props.member} />
                    </div>
                    {cells}
                </div>);
            }
        });
    }
);