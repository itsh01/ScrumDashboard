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

        onChange: function () {
            this.setState({});
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
                            assignee: '',
                            team: isCompanyList ? '' : self.context.teamId
                        };
                    self.context.flux.cardsActions.updateCard(card.id, newCardData);

                }
            };
        },
        addNewCard: function () {
            //this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_ADD_CARD);
            this.context.flux.planningActions.planningAddCard();

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