define([
        'lodash',
        'React'],
    function (_,
              React) {
        'use strict';

        return React.createClass({
            displayName: 'CardBtn',

            propTypes: {
                card: React.PropTypes.object.isRequired,
                isCreating: React.PropTypes.bool.isRequired
            },

            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any
            },

            saveCard: function () {
                if (this.props.card.assignee && this.props.card.status === 'unassigned') {
                    return;
                }
                if (this.props.isCreating) {
                    this.context.newFlux.cardsActions.addCard(this.props.card);
                } else {
                    this.context.newFlux.cardsActions.updateCard(this.props.card.id, this.props.card);
                }
                this.requireClosePopup();
            },

            requireClosePopup: function () {
                this.context.newFlux.planningActions.planningDoneAddingCard();
            },

            render: function () {
                return (
                    <div className='card-edit-btn-container'>
                        <button className='card-edit-btn card-edit-btn-cancel' onClick={this.requireClosePopup}>
                            Cancel
                        </button>
                        <button className='card-edit-btn card-edit-btn-save' onClick={this.saveCard}>
                            Save
                        </button>
                    </div>
                );
            }
        });
    });