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

            saveCard: function () {
                var dispatcher = this.context.flux.dispatcher;

                if (this.props.isCreating) {
                    dispatcher.dispatchAction(constants.actionNames.ADD_CARD, this.props.card);
                } else {
                    dispatcher.dispatchAction(constants.actionNames.UPDATE_CARD,
                        this.props.card.id,
                        this.props.card);
                }
                this.requireClosePopup();
            },

            requireClosePopup: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_DONE_ADDING_CARD);
            },

            render: function () {
                return (
                    <div className='card-edit-btn-container'>

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