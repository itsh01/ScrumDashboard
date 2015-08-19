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
                    <span className="beforeline">Start: {this.props.sprint.startDate}</span>
                    <span className="leftline">End: {this.props.sprint.endDate}</span>
                    <span className="leftline">Actual Velocity: {actualVelocity}</span>
                    <span className="leftline">Expected Velocity: {expectedVelocity}</span>
                </div>);
            }
        });
    }
);