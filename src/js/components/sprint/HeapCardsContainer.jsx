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
                    isOpen: false
                };
            },

            cardClickHandler: function (cardId) {
                var openCardId = (this.state.openCardId === cardId) ? null : cardId;
                this.setState({openCardId: openCardId, isOpen: true});
            },

            closeHeapBtnHandler: function () {
                this.setState({isOpen: false});
            },

            getOpenHeapCardStyle: function (cardIndex) {
                var cardsNum = this.props.cards.length,
                    t = 2 * Math.PI * cardIndex / cardsNum,
                    r = 10,
                    x = 1.5 * r * Math.cos(t),
                    y = r * Math.sin(t);
                return {transform: 'translate(' + x + 'rem, ' + y + 'rem)', zIndex: 2};
            },

            getClosedHeapCardStyle: function () {
                return { };
            },

            render: function () {
                var cardStyle = (this.state.isOpen) ? this.getOpenHeapCardStyle : this.getClosedHeapCardStyle,
                    cards = _.map(this.props.cards, function (card, cardIndex) {
                        return (<div style={cardStyle(cardIndex)} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.cardClickHandler} forceReset={!this.state.isOpen} />
                        </div>);
                    }.bind(this));

                return (<div className="sprint-cards-container heap-view">
                    <button className='sprint-cards-container-close-heap-btn' onClick={this.closeHeapBtnHandler}>Close</button>
                    {cards}
                </div>);
            }
        });
    });