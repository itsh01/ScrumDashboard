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
                    openCardsIds: []
                };
            },

            cardClicked: function (cardId) {
                var newOpenCardsIds = this.state.openCardsIds,
                    cardIndex = _.indexOf(newOpenCardsIds, cardId);
                if (cardIndex !== -1) {
                    newOpenCardsIds.splice(cardIndex);
                } else {
                    newOpenCardsIds.push(cardId);
                }
                this.setState({openCardsIds: newOpenCardsIds});
            },

            render: function () {
                var self = this,
                    cards = _.map(this.props.cards, function (card, cardIndex) {
                    var cardStyle = {
                        top: cardIndex * 0.6 + 'rem',
                        left: cardIndex * 0.6 + 'rem'
                    };
                    cardStyle.zIndex = (_.indexOf(self.state.openCardsIds, card.id) !== -1) ? 10 : cardIndex;
                    return (<div style={cardStyle} className="sprint-card-wrapper">
                        <Card key={card.id} card={card} cardClickHandler={self.cardClicked} />
                    </div>);
                });
                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });