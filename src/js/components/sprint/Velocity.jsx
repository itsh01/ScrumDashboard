define([
        'lodash',
        'React',

        'mixins/HistoryMixin'
    ],
    function (_, React, HistoryMixin) {
        'use strict';

        return React.createClass({
            displayName: 'Velocity',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                retro: React.PropTypes.array,
                sprintMembers: React.PropTypes.array
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
            render: function () {

                var cards = [],
                    lastLifecycleState = _.last(this.props.cardLifecycle),
                    actualVelocity = 0,
                    expectedVelocity = 0;

                var retro = this.props.retro;
                if (retro) {
                    cards = _.map(retro, this.mapHistoryToCards);
                } else {
                    _.forEach(this.props.sprintMembers, function (memberId) {
                        cards = cards.concat(this.context.flux.cardsStore.getUserCards(memberId));
                    }, this);
                }

                expectedVelocity = _(cards)
                    .pluck('score')
                    .sum();

                actualVelocity = _(cards)
                    .filter({status: lastLifecycleState})
                    .pluck('score')
                    .sum();


                return (<div className="sprint-velocity text-center">
                    <h3 className="sprint-velocity-title underline">Sprint Velocity</h3>
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