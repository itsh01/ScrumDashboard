define([
        'lodash',
        'React',
        'components/card/Card'
    ],
    function (_, React, Card) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Cards Container - Heap View',

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

            heapCardClicked: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                this.setState({openCardId: openCardId});
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
                return {transform: 'translate(' + x + 'rem, ' + y + 'rem)', zIndex: 2};
            },

            render: function () {
                var cards = _.map(this.state.cards, function (card, cardIndex) {
                        return (<div style={this.getHeapCardStyle(cardIndex)} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.heapCardClicked} />
                        </div>);
                    }.bind(this));

                return (<div className="sprint-cards-container heap-view">
                    {cards}
                </div>);
            }
        });
    });