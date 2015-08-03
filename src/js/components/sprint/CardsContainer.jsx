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
            render: function () {
                var cards = _.map(this.props.cards, function (card, cardIndex) {
                    var cardStyle = {
                        zIndex: cardIndex,
                        top: cardIndex * 0.4 + 'rem',
                        left: cardIndex * 0.4 + 'rem'
                    };
                    return (<div style={cardStyle} className="sprint-card-wrapper">
                        <Card key={card.id} card={card} />
                    </div>);
                });
                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });