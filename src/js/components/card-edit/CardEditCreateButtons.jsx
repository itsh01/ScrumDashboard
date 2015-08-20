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
                flux: React.PropTypes.any
            },

            componentDidMount: function () {
                window.addEventListener('keydown', this.handleKeyDown);
            },


            componentWillUnmount: function () {
                window.removeEventListener('keydown', this.handleKeyDown);
            },

            handleKeyDown: function (event) {
                if (event.keyCode === 13) {  // enter key
                    this.saveCard();
                }
                if (event.keyCode === 27) {   //esc key
                    // Close my modal window
                    this.context.flux.planningActions.planningDoneAddingCard();
                }
            },

            saveCard: function () {
                if (this.props.card.assignee && this.props.card.status === 'unassigned') {
                    return;
                }
                if (this.props.isCreating) {
                    this.context.flux.cardsActions.addCard(this.props.card);
                } else {
                    this.context.flux.cardsActions.updateCard(this.props.card.id, this.props.card);
                }
                this.requireClosePopup();
            },

            requireClosePopup: function () {
                this.context.flux.planningActions.planningDoneAddingCard();
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