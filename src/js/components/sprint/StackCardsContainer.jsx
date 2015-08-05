define([
        'lodash',
        'React',
        'components/card/Card'
    ],
    function (_, React, Card) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Cards Container - Stack View',

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

            getStackCardStyle: function (cardIndex, card) {
                var cardStyle = {
                    transform: 'translate(' + (cardIndex * 0.9) + 'rem, ' + (cardIndex * 0.6) + 'rem)'
                };
                cardStyle.zIndex = (this.state.openCardId === card.id) ? this.state.cards.length : cardIndex;
                return cardStyle;
            },

            render: function () {
                var cards = _.map(this.state.cards, function (card, cardIndex) {
                    return (
                        <div style={this.getStackCardStyle(cardIndex, card)} key={card.id}
                             className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.stackCardClicked}/>
                        </div>);
                }.bind(this));
                return (<div className="sprint-cards-container stack-view">
                    {cards}
                </div>);
            }
        });
    });