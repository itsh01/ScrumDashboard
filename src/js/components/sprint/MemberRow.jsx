define([
        'lodash',
        'React',
        'components/sprint/Member',
        'components/card/Card'
    ],
    function (_, React, SprintMember, Card) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Member Row',
            contextTypes: {
                flux: React.PropTypes.any
            },
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                member: React.PropTypes.object
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
                        var cellCards = _(cards)
                            .filter(function (card) {
                                return card.status === phase;
                            })
                            .map(function (card) {
                                return (<Card
                                    key={card.id}
                                    card={card}
                                />);
                            }).value();

                        return (<div className="table-cell" key={phase}>
                            {cellCards}
                        </div>);
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