/**
 * Created by tome on 7/28/15.
 */
define([
        'lodash',
        'React',
        'constants',
        'DragDropMixin'
    ],
    function (_, React, constants, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Card',
            propTypes: {
                card: React.PropTypes.object,
                cardClickHandler: React.PropTypes.func,
                forceReset: React.PropTypes.bool,
                isEditable: React.PropTypes.bool,
                key: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any,
                sprintState: React.PropTypes.number

            },
            mixins: [DragDropMixin],

            getInitialState: function () {
                return {isDescriptionOpened: false};
            },

            componentWillReceiveProps: function (nextProps) {
                if (nextProps.forceReset === true) {
                    this.setState({isDescriptionOpened: false});
                }
            },

            dragDrop: function () {
                var locked = constants.SPRINT_STATUS.RETRO === this.context.sprintState;

                return {
                    draggable: !locked,
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
                        [<h3 className="card-title" key={1}>{this.props.card.name}</h3>,
                            <div className="card-points" key={2}>{pointsDescription}</div>]
                );
            },
            toggleDescriptionOpened: function () {
                if (this.preventToggleCard) {
                    return;
                }
                this.setState({isDescriptionOpened: !this.state.isDescriptionOpened});
                if (this.props.cardClickHandler && !this.state.preventToggleCard) {
                    this.props.cardClickHandler(this.props.card.id);
                }
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
            removeCard: function () {
                this.context.newFlux.cardsActions.removeCard(this.props.card.id);
            },
            editCard: function (e) {
                this.preventToggleCard = true;
                this.context.newFlux.planningActions.editCard(this.props.card);
                e.stopPropagation();
            },
            render: function () {
                this.preventToggleCard = false;
                var cx = React.addons.classSet;
                var currentSprint = this.context.newFlux.teamsStore.getCurrentSprint();
                var classesObject = {
                    card: true,
                    'card-open': this.state.isDescriptionOpened,
                    'card-editable': this.props.isEditable || currentSprint && currentSprint.state === constants.SPRINT_STATUS.PLANNING
                };
                classesObject[this.pointsClass[this.getCardScore()]] = true;
                var classes = cx(classesObject);
                return (
                    <div
                        className={classes}
                        onClick={this.toggleDescriptionOpened}>
                        <img
                            src='img/close.svg'
                            style={{width: '1rem', height: '1rem'}}
                            className='card-delete'
                            onClick={this.removeCard}/>

                        <button className='card-btn-edit' onClick={this.editCard}>edit</button>
                        {this.getCardContent()}
                    </div>

                );
            }
        });
    }
);