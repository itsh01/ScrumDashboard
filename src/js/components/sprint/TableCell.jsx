define([
        'lodash',
        'React',
        'components/sprint/CardsContainer',
        'mixins/DragDropMixin'
    ],
    function (_, React, CardsContainer, DragDropMixin) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Cell',
            propTypes: {
                cards: React.PropTypes.array
            },
            mixins: [DragDropMixin],
            render: function () {
                return (<div
                    className="table-cell">
                    <CardsContainer cards={this.props.cards} />
                </div>);
            }
        });
    }
);