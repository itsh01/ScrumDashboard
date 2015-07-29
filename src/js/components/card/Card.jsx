/**
 * Created by tome on 7/28/15.
 */
define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Card',
        propTypes: {
            card: React.PropTypes.object
        },
        getDefaultProps: function () {
            return {
                card: {
                    name: 'Card Name',
                    description: 'This is the card\'s description',
                    score: 1
                }
            };
        },
        getInitialState: function () {
            return {
                isDescriptionOpened: false
            };
        },
        getCardScore: function () {
            return this.props.card.score ? this.props.card.score.toString() : 'None';
        },
        getCardContent: function () {
            var pointsDescription = 'points: ' + this.getCardScore();
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
            None: 'card-none'
        },
        getCardClassName: function () {
            return 'card ' + this.pointsClass[this.getCardScore()];
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