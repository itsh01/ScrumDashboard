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
                var cards = _.map(this.props.cards, function (card) {
                    return (<Card key={card.id} card={card} />);
                });
                return (<div className="sprint-cards-container">
                    {cards}
                </div>);
            }
        });
    });