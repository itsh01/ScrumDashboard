define([
        'lodash',
        'React',
        'components/card/Card',
        'components/sprint/ContainerSize'
    ],
    function (_, React, Card, ContainerSize) {
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

            getClosedHeapCardStyle: function () {
                return {};
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
                    cards.push(<ContainerSize
                        containerSize={this.props.cards.length}
                        clickHandler={this.cardClickHandler}/>);
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