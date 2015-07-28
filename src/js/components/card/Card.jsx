/**
 * Created by tome on 7/28/15.
 */
define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Card',
        propTypes: {
            description: React.PropTypes.string,
            points: React.PropTypes.number,
            title: React.PropTypes.string
        },
        getDefaultProps: function () {
            return {
                title: 'Card Title',
                description: 'This is the card\'s description',
                points: 1
            };
        },
        getInitialState: function () {
            return {
                isDescriptionOpened: false
            };
        },
        getCardContent: function () {
            var pointsDescription = 'points = ' + this.props.points;
            return (
                this.state.isDescriptionOpened ?
                    [<p className="card-description">{this.props.description}</p>] :
                    [<h3 className="card-title">{this.props.title}</h3>,
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
            13: 'card-13'
        },
        getCardClassName: function () {
            return 'card ' + this.pointsClass[this.props.points.toString()];
        },
        render: function () {
            return (
                <div className={this.getCardClassName()} onClick={this.toggleDescriptionOpened}>
                    {this.getCardContent()}
                </div>
            );
        }
    });
});