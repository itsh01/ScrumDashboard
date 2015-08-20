define([
        'lodash',
        'React',

        'mixins/HistoryMixin',

        'constants'
    ],
    function (_, React, HistoryMixin, constants) {
        'use strict';

        return React.createClass({
            displayName: 'Velocity',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                retro: React.PropTypes.array,
                sprintId: React.PropTypes.string,
                sprintMembers: React.PropTypes.array,
                sprintStatus: React.PropTypes.number
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
            getSprintCards: function () {
                var cards = [],
                    retro = this.props.retro,
                    teamsStore = this.context.flux.teamsStore,
                    sprintIsLocked = this.props.sprintStatus === constants.SPRINT_STATUS.RETRO;

                if (sprintIsLocked) {
                    cards = _.map(retro, this.mapHistoryToCards);
                } else {
                    _.forEach(this.props.sprintMembers, function (memberId) {
                        cards = cards.concat(teamsStore.getMemberCardsInSprint(memberId, this.props.sprintId));
                    }, this);
                }
                return cards;
            },
            calcExpectedVelocity: function (cards) {
                return _(cards)
                    .pluck('score')
                    .sum();
            },
            calcActualVelocity: function (cards, lastLifecycleState) {
                return _(cards)
                    .filter({status: lastLifecycleState})
                    .pluck('score')
                    .sum();
            },
            render: function () {

                var cards = this.getSprintCards(),
                    lastLifecycleState = _.last(this.props.cardLifecycle),
                    actualVelocity = this.calcActualVelocity(cards, lastLifecycleState),
                    expectedVelocity = this.calcExpectedVelocity(cards);

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