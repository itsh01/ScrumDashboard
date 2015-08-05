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
                    openCardId: null,
                    cards: this.props.cards
                };
            },

            componentWillReceiveProps: function (nextProps) {
                this.setState({cards: nextProps.cards});
            },

            stackCardClicked: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                var cards = this.state.cards;
                if (cards[cards.length - 1].id !== cardId) {
                    var topCard = _.remove(cards, {id: cardId})[0];
                    cards.push(topCard);
                }
                this.setState({openCardId: openCardId, cards: cards});
            },

            heapCardClicked: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                this.setState({openCardId: openCardId});
            },

            getStackCardStyle: function (cardIndex, card) {
                var cardStyle = {
                    transform: 'translate(' + (cardIndex * 0.6) + 'rem, ' + (cardIndex * 0.6) + 'rem)'
                };
                cardStyle.zIndex = (this.state.openCardId === card.id) ? this.state.cards.length : cardIndex;
                return cardStyle;
            },

            getHeapCardStyle: function (cardIndex) {
                if (this.state.openCardId === null) {
                    return { };
                }
                var cardsNum = this.state.cards.length;
                var t = 2 * Math.PI * cardIndex / cardsNum;
                var r = 10;
                var a = 0, b = 0; // center
                var x = a + r * Math.cos(t), y = b + r * Math.sin(t);
                return {transform: 'translate(' + x + 'rem, ' + y + 'rem)'};
            },

            getHandlers: function () {
                if (this.state.cards.length > 3) {
                    return {style: this.getHeapCardStyle, click: this.heapCardClicked};
                }
                return {style: this.getStackCardStyle, click: this.stackCardClicked};
            },

            render: function () {
                var handlers = this.getHandlers(),
                    cards = _.map(this.state.cards, function (card, cardIndex) {
                        return (<div style={handlers.style(cardIndex, card)} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={handlers.click} />
                        </div>);
                    });

                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });