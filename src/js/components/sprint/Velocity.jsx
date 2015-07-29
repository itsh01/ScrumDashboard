define([
        'lodash',
        'React'
    ],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                sprintMembers: React.PropTypes.array
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    sprintMembers: [
                        '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                        '061804a2-1f93-40e1-bf49-57b82e5b568b'
                    ]
                };
            },
            render: function () {

                var cards = [],
                    lastLifecycleState = _.last(this.props.cardLifecycle),
                    actualVelocity = 0,
                    expectedVelocity = 0;

                _.forEach(this.props.sprintMembers, function (memberId) {
                    cards = cards.concat(this.context.flux.cardsStore.getUserCards(memberId));
                }, this);

                expectedVelocity = _(cards)
                    .pluck('score')
                    .sum();

                actualVelocity = _(cards)
                    .filter({status: lastLifecycleState})
                    .pluck('score')
                    .sum();


                return (<div className="sprint-velocity text-center">
                    <h3 className="sprint-velocity-title">Sprint Velocity</h3>
                    <div className="sprint-velocity-data">
                        <div className="sprint-velocity-line">
                            <span>Actual: </span>
                            <span className="sprint-velocity-number">{actualVelocity}</span>
                        </div>
                        <div className="sprint-velocity-line">
                            <span>Expected: </span>
                            <span className="sprint-velocity-number">{expectedVelocity}</span>
                        </div>
                    </div>
                </div>);
            }
        });
    }
);