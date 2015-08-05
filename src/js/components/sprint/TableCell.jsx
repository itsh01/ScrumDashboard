define([
        'lodash',
        'React',

        'components/sprint/CardsContainer',

        'DragDropMixin',

        'constants'
    ],
    function (_, React, CardsContainer, DragDropMixin, constants) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Cell',
            propTypes: {
                assignee: React.PropTypes.string,
                cards: React.PropTypes.array,
                status: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any,
                teamId: React.PropTypes.string,
                sprintState: React.PropTypes.number
            },
            mixins: [DragDropMixin],
            dragDrop: function () {


                var locked = constants.SPRINT_STATUS.RETRO === this.context.sprintState,
                    self = this;

                return {
                    droppable: !locked,
                    acceptableDrops: ['card'],
                    drop: function (card) {

                        var isInProgress = constants.SPRINT_STATUS.IN_PROGRESS === self.context.sprintState;

                        if (card.status === 'unassigned' && isInProgress) {
                            return;
                        }

                        var newCardData = {
                            status: self.props.status,
                            assignee: self.props.assignee,
                            team: self.context.teamId
                        };

                        self.context.flux.dispatcher.dispatchAction(
                            constants.actionNames.UPDATE_CARD,
                            card.id,
                            newCardData
                        );


                    }
                };
            },
            render: function () {
                return (
                    <div className="table-cell">
                       <CardsContainer cards={this.props.cards}/>
                    </div>
                );
            }
        });
    }
);