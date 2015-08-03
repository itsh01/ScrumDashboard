define([
        'lodash',
        'React',

        'components/card/Card',

        'DragDropMixin',

        'constants'
    ],
    function (_, React, Card, DragDropMixin, constants) {
    'use strict';

    return React.createClass({

        displayName: 'CardsList',
        propTypes: {
            cardsList: React.PropTypes.array,
            title: React.PropTypes.string
        },
        contextTypes: {
            flux: React.PropTypes.any,
            teamId: React.PropTypes.string
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
            console.log(this.context.teamId);
            return {
                droppable: true,
                acceptableDrops: ['card'],
                drop: function (card) {

                    var isCompanyList = self.props.title === 'Company',
                    newCardData = {
                            status: 'unassigned',
                            assignee: null,
                            team: isCompanyList ? null : self.context.teamId
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
            var cardsListToDisplay = _.map(this.props.cardsList, function (card) {
                return <Card card={card} key={card.id}/>;
            }, this);

            return (
                <div>
                    <h3>{this.props.title} </h3>
                    {cardsListToDisplay}
                </div>
            );
        }

    });
});