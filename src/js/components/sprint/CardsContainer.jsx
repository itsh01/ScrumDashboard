define([
        'lodash',
        'React',
        'components/card/Card'
    ],
    function (_, React, Card) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Cards Container',
            propTypes: {
                cards: React.PropTypes.array
            },

            getInitialState: function () {
                return {
                    openCardId: null
                };
            },

            cardClicked: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                this.setState({openCardId: openCardId});
            },

            getStackCardStyle: function (card, cardIndex) {
                var cardStyle = {
                    top: cardIndex * 0.6 + 'rem',
                    left: cardIndex * 0.6 + 'rem'
                };
                cardStyle.zIndex = (this.state.openCardId === card.id) ? this.props.cards.length : cardIndex;
                return cardStyle;
            },

            getHeapCardStyle: function (cardIndex) {
                return {
                    top: 0,
                    left: 0,
                    zIndex: cardIndex
                };
            },

            render: function () {
                var cardsNum = this.props.cards.length,
                    cards = _.map(this.props.cards, function (card, cardIndex) {
                        var cardStyle = (cardsNum < 5) ? this.getStackCardStyle(card, cardIndex) : this.getHeapCardStyle(card);
                        return (<div style={cardStyle} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.cardClicked}/>
                        </div>);
                    }.bind(this));

                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });