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
            dragDrop: function () {
                return {
                    droppable: true,
                    drop: function (data) {
                        console.log(data);
                    }
                };
            },
            render: function () {
                return (<div
                    className="table-cell">
                    <CardsContainer cards={this.props.cards}/>
                </div>);
            }
        });
    }
);