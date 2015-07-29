define([
        'lodash',
        'React',
        'components/card/Card',
        'components/backlog/CardsList'
    ],
    function (_, React, Card, CardsList) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Cards Container',
            propTypes: {
                cards: React.PropTypes.array
            },
            render: function () {
                return (<div className="sprint-cards-container">
                    <CardsList cardsList={this.props.cards} />
                </div>);
            }
        });
    });