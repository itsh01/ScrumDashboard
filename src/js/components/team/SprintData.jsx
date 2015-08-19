define([
        'lodash',
        'React',

        'mixins/HistoryMixin',

        'constants'
    ],
    function (_, React, HistoryMixin, constants) {
        'use strict';

        return React.createClass({
            displayName: 'SprintData',

            propTypes: {
                sprint: React.PropTypes.any
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
                    retro = this.props.sprint.retroCardsStatus,
                    teamsStore = this.context.flux.teamsStore,
                    sprintIsLocked = this.props.sprint.state === constants.SPRINT_STATUS.RETRO;

                if (sprintIsLocked) {
                    cards = _.map(retro, this.mapHistoryToCards);
                } else {
                    _.forEach(this.props.sprint.members, function (memberId) {
                        cards = cards.concat(teamsStore.getMemberCardsInSprint(memberId, this.props.sprint.id));
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
                    lastLifecycleState = _.last(this.props.sprint.cardLifecycle),
                    actualVelocity = this.calcActualVelocity(cards, lastLifecycleState),
                    expectedVelocity = this.calcExpectedVelocity(cards);

                return (<div className="sprint-metadata text-center">
                    <span>Start: {this.props.sprint.startDate}</span>
                    <span> &#124; </span>
                    <span>End: {this.props.sprint.endDate}</span>
                    <span> &#124; </span>
                    <span>Actual Velocity: </span>
                    <span className="sprint-velocity-number">{actualVelocity}</span>
                    <span> &#124; </span>
                    <span>Expected Velocity: </span>
                    <span className="sprint-velocity-number">{expectedVelocity}</span>
                </div>);
            }
        });
    }
);