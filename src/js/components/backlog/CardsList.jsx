define(['lodash', 'React', 'components/card/Card'], function (_, React, Card) {
    'use strict';
    /** jsx React.DOM */

    return React.createClass({

        displayName: 'CardsList',
        contextTypes: {
            flux: React.PropTypes.any
        },
        propTypes: {
            cardsList: React.PropTypes.array,
            title: React.PropTypes.string
        },
        render: function () {
            var cardsListToDisply = this.props.cardsList;
            return <div>
                <h2>{this.props.title} </h2>
                {
                    _.map(cardsListToDisply, function (card) {
                        return <Card title={card.name} description = {card.description}/>;
                    }, this)}
            </div>;
        }

    });
});