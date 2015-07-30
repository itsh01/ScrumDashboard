define([
        'lodash',
        'React',
        'components/sprint/CardsContainer'
    ],
    function (_, React, CardsContainer) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Cell',
            propTypes: {
                cards: React.PropTypes.array
            },
            handleDragOver: function (e) {
                e.preventDefault();
            },
            render: function () {
                return (<div
                    className="table-cell"
                    onDragOver={this.handleDragOver}>
                    <CardsContainer cards={this.props.cards} />
                </div>);
            }
        });
    }
);