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
                    open: false
                };
            },

            cardClickHandler: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                this.setState({openCardId: openCardId, open: true});
            },

            closeHeapBtnHandler: function () {
                this.setState({open: false});
            },

            getOpenHeapCardStyle: function (cardIndex) {
                var cardsNum = this.props.cards.length,
                    t = 2 * Math.PI * cardIndex / cardsNum,
                    r = 10,
                    x = r * Math.cos(t),
                    y = r * Math.sin(t);
                return {transform: 'translate(' + x + 'rem, ' + y + 'rem)', zIndex: 1};
            },

            getClosedHeapCardStyle: function () {
                return { };
            },

            render: function () {
                var cardStyle = (this.state.open) ? this.getOpenHeapCardStyle : this.getClosedHeapCardStyle,
                    cards = _.map(this.props.cards, function (card, cardIndex) {
                        return (<div style={cardStyle(cardIndex)} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.cardClickHandler} />
                        </div>);
                    }.bind(this));

                return (<div className="sprint-cards-container heap-view">
                    <button className='sprint-cards-container-close-heap-btn' onClick={this.closeHeapBtnHandler}>Close</button>
                    {cards}
                </div>);
            }
        });
    });