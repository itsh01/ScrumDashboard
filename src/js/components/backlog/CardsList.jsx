define(['lodash', 'React', 'components/card/Card'], function (_, React, Card) {
    'use strict';
    /** jsx React.DOM */

    return React.createClass({

        displayName: 'CardsList',
        propTypes: {
            cardsList: React.PropTypes.array,
            title: React.PropTypes.string
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        getInitialState: function () {
            return {
                initialCards: [],
                Cards: []

            };
        },
        render: function () {
            var cardsListToDisply = this.props.cardsList;
            return (<div>
                <h2>{this.props.title} </h2>
                {
                    _.map(cardsListToDisply, function (card) {
                        return <Card card={card} key={card.id}/>;
                    }, this)
                }
            </div>);
        }

    });
});