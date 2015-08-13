define([
        'lodash',
        'React',
        'components/card/Card'
    ],
    function (_, React, Card) {
        'use strict';

        return React.createClass({
            displayName: 'SprintCardsHeapContainer',

            propTypes: {
                cards: React.PropTypes.array
            },

            getInitialState: function () {
                return {
                    openCardId: null,
                    isHeapOpen: false
                };
            },

            cardClickHandler: function (cardId) {
                var openCardId = (!this.state.isHeapOpen && this.state.openCardId === null) ? null : cardId;
                this.setState({
                    openCardId: openCardId,
                    isHeapOpen: true
                });
            },

            closeHeapBtnHandler: function () {
                this.setState({
                    openCardId: null,
                    isHeapOpen: false
                });
            },

            getOpenHeapCardStyle: function (cardIndex) {
                var cardsNum = this.props.cards.length,
                    t = 2 * Math.PI * cardIndex / cardsNum,
                    r = 2 + cardsNum,
                    x = 1.5 * r * Math.cos(t),
                    y = r * Math.sin(t);
                return {
                    transform: 'translate(' + x + 'rem, ' + y + 'rem)',
                    zIndex: 100
                };
            },

            getClosedHeapCardStyle: function (cardIndex) {
                return {
                    top: cardIndex * 0.2 + 'rem',
                    left: cardIndex * 0.3 + 'rem'
                };
            },

            toForceCardsReset: function () {
                return (!this.state.isHeapOpen || this.state.openCardId === null);
            },

            render: function () {
                var cardStyle = (this.state.isHeapOpen) ? this.getOpenHeapCardStyle : this.getClosedHeapCardStyle,
                    cards = _.map(this.props.cards, function (card, cardIndex) {
                        return (<div style={cardStyle(cardIndex)} key={card.id} className="sprint-card-wrapper">
                            <Card card={card} cardClickHandler={this.cardClickHandler}
                                  forceReset={this.toForceCardsReset()}/>
                        </div>);
                    }.bind(this));

                if (!this.state.isHeapOpen) {
                    cards.push(
                        <div className='card sprint-card-wrapper cards-container-heap-size'
                             onClick={this.cardClickHandler}
                             style={cardStyle(this.props.cards.length - 1)}>
                            <div className='container-size'>( {this.props.cards.length} )</div>
                            <img className='open-heap-img' src="img/open-heap-container.png" alt=""/>
                        </div>
                    );
                }

                return (
                    <div className="sprint-cards-container heap-view">
                        <button className='sprint-cards-container-close-heap-btn'
                                onClick={this.closeHeapBtnHandler}>Close
                        </button>
                        {cards}
                    </div>
                );
            }
        });
    });