define([
        'lodash',
        'React'
    ],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'Velocity',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                sprintMembers: React.PropTypes.array
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