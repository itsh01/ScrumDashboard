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
                var eventStr = isSaving ? constants.actionNames.ADD_CARD : constants.actionNames.REMOVE_CARD;
                dispatcher.dispatchAction(eventStr, this.props.card);

            },

            saveCard: function () {
                this.saveOrDeleteCard(true);
            },

            deleteCard: function () {
                this.saveOrDeleteCard(false);
            },

            render: function () {
                var deleteBtn = this.props.isCreating ? null :
                    <button className='card-edit-btn card-edit-btn-delete' onClick={this.deleteCard}>
                        Delete</button>;
                return (
                    <div className='card-edit-btn-container'>
                        {deleteBtn}
                        <button className='card-edit-btn card-edit-btn-cancel'>Cancel</button>
                        <button className='card-edit-btn card-edit-btn-save' onClick={this.saveCard}>
                            Save
                        </button>
                    </div>
                );
            }
        });
    });