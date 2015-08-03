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
                teamId: React.PropTypes.string
            },
            mixins: [DragDropMixin],
            dragDrop: function () {

                var self = this;
                return {
                    droppable: true,
                    acceptableDrops: ['card'],
                    drop: function (card) {

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