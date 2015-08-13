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
<<<<<<< HEAD

                    self.context.flux.dispatcher.dispatchAction(
=======
                    this.context.flux.dispatcher.dispatchAction(
>>>>>>> d8fe1ff27d34c356e53cac975ff06d80bd816ba4
                        constants.actionNames.UPDATE_CARD,
                        card.id,
                        newCardData
                    );
                }
            };
        },
        addNewCard: function () {
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_ADD_CARD);
        },

        emptyCard: {
            name: 'Add new card',
            description: 'Please add me',
            score: -1
        },
        render: function () {
            var cardsListToDisplay = _.map(this.props.cardsList, function (card) {
                return <Card isEditable={true} card={card} key={card.id}/>;
            }, this);

            if (this.props.cardsList.length === 0) {
                cardsListToDisplay = (<img
                    ref= 'plusAddButton'
                    src='img/plus-640.png'
                    style={{width: '5rem'}}
  //                  className='card-delete'
                    onClick={this.addNewCard}/>);
                //cardsListToDisplay = <Card onClick={this.addNewCard} card={this.emptyCard} key='empty'/>;
            }

            return (
                <div className="cards-list">
                    <h3>{this.props.title} </h3>
                    {cardsListToDisplay}
                </div>
            );
        }

    });
});