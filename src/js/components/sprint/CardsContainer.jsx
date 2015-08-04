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

            getCardStyle: function (card, cardIndex) {
                var cardStyle = {
                    top: cardIndex * 0.6 + 'rem',
                    left: cardIndex * 0.6 + 'rem'
                };
                if (this.state.openCardId === card.id) {
                    cardStyle.zIndex = 1;
                }
                return cardStyle;
            },

            render: function () {
                var cards = _.map(this.props.cards, function (card, cardIndex) {

                    var cardStyle = this.getCardStyle(card, cardIndex);

                    return (<div style={cardStyle} key={card.id} className="sprint-card-wrapper">
                        <Card card={card} cardClickHandler={this.cardClicked} />
                    </div>);

                }.bind(this));

                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });