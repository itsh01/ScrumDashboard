define([
        'lodash',
        'React',
        'components/sprint/CardsContainer',
        'mixins/DragDropMixin'
    ],
    function (_, React, CardsContainer, DragDropMixin) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Cell',
            propTypes: {
                assignee: React.PropTypes.string,
                cards: React.PropTypes.array,
                status: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            mixins: [DragDropMixin],
            dragDrop: function () {

                var self = this;
                return {
                    droppable: true,
                    drop: function (card) {

                        var newCardData = {
                            status: self.props.status,
                            assignee: self.props.assignee
                        };

                        // TODO: change to suitable dispatcher format after written
                        self.context.flux.dispatcher.dispatchAction(
                            'UPDATE_CARD',
                            [
                                card.id,
                                newCardData
                            ]
                        );


                    }
                };
            },
            render: function () {
                return (<div
                    className="table-cell">
                    <CardsContainer cards={this.props.cards}/>
                </div>);
            }
        });
    }
);