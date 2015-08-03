/**
 * Created by tome on 7/28/15.
 */
define([
        'lodash',
        'React',

        'mixins/DragDropMixin'
    ],
    function (_, React, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Card',
            propTypes: {
                card: React.PropTypes.object
            },
            mixins: [DragDropMixin],
            getInitialState: function () {
                return {
                    isDescriptionOpened: false
                };
            },
            dragDrop: function () {
                return {
                    draggable: true,
                    dataTransfer: this.props.card,
                    dropType: 'card'
                };
            },
            getCardScore: function () {
                return this.props.card.score ? this.props.card.score.toString() : 'No';
            },
            getCardContent: function () {
                var pointsDescription = this.getCardScore() + ' pts';
                return (
                    this.state.isDescriptionOpened ?
                        [<p className="card-description">{this.props.card.description}</p>] :
                        [<h3 className="card-title">{this.props.card.name}</h3>,
                            <div className="card-points">{pointsDescription}</div>]
                );
            },
            toggleDescriptionOpened: function () {
                this.setState({isDescriptionOpened: !this.state.isDescriptionOpened});
            },
            pointsClass: {
                1: 'card-1',
                2: 'card-2',
                3: 'card-3',
                5: 'card-5',
                8: 'card-8',
                13: 'card-13',
                No: 'card-none'
            },
            render: function () {
                var cx = React.addons.classSet;
                var classesObject = {card: true, 'card-open': this.state.isDescriptionOpened};
                classesObject[this.pointsClass[this.getCardScore()]] = true;
                var classes = cx(classesObject);
                return (
                    <div
                        className={classes}
                        onClick={this.toggleDescriptionOpened}>
                        {this.getCardContent()}
                    </div>

                );
            }
        });
    }
);