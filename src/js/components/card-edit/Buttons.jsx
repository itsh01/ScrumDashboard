define([
        'lodash',
        'React',
        'constants'],
    function (_,
              React,
              constants) {
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

            saveOrDeleteCard: function (isSaving) {
                var dispatcher = this.context.flux.dispatcher;
                console.log(this.props.card);
                if (isSaving && this.props.isCreating) {
                    dispatcher.dispatchAction(constants.actionNames.ADD_CARD, this.props.card);
                } else if (isSaving) {
                    dispatcher.dispatchAction(constants.actionNames.UPDATE_CARD,
                        this.props.card.id,
                        this.props.card);
                } else {
                    dispatcher.dispatchAction(constants.actionNames.REMOVE_CARD, this.props.card.id);
                }
                this.requireClosePopup();
            },

            saveCard: function () {
                this.saveOrDeleteCard(true);
            },

            deleteCard: function () {
                this.saveOrDeleteCard(false);
            },

            requireClosePopup: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_DONE_ADDING_CARD);
            },

            render: function () {
                var deleteBtn = this.props.isCreating ? null :
                    <button className='card-edit-btn card-edit-btn-delete' onClick={this.deleteCard}>
                        Delete</button>;
                return (
                    <div className='card-edit-btn-container'>
                        {deleteBtn}
                        <button className='card-edit-btn card-edit-btn-cancel' onClick={this.requireClosePopup}>Cancel
                        </button>
                        <button className='card-edit-btn card-edit-btn-save' onClick={this.saveCard}>
                            Save
                        </button>
                    </div>
                );
            }
        });
    });