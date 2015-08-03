define([
        'lodash',
        'React',

        'components/card/Card',

        'DragDropMixin'
    ],
    function (_, React, Card, DragDropMixin) {
    'use strict';

    return React.createClass({

        displayName: 'CardsList',
        propTypes: {
            cardsList: React.PropTypes.array,
            title: React.PropTypes.string
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        mixins: [DragDropMixin],

        getInitialState: function () {
            return {
                initialCards: [],
                Cards: []

            };
        },
        dragDrop: function () {

            var self = this;

            return {
                droppable: true,
                acceptableDrops: ['card'],
                drop: function (card) {
                    //console.log( ? 'rrrrrr' : 'ttttt');

                    var newCardData = {
                        status: 'unassigned',
                        assignee: null
                    };
                    
                    if (self.props.title === 'Company') {
                        newCardData.team = null;
                    }
                    self.context.flux.dispatcher.dispatchAction(
                        'UPDATE_CARD',
                        card.id,
                        newCardData
                    );
                }
            };
        },
        render: function () {
            var cardsListToDisply = this.props.cardsList;
            return (
                <div>
                    <h3>{this.props.title} </h3>
                    {
                        _.map(cardsListToDisply, function (card) {
                            return <Card card={card} key={card.id}/>;
                        }, this)
                    }
                </div>
            );
        }

    });
});