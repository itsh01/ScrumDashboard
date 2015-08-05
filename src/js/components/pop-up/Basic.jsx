define([
        'React',

        'constants'
    ],
    function (React, constants) {
        'use strict';
        return React.createClass({
            displayName: 'BasicPopUp',

            propTypes: {
                children: React.PropTypes.element
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            requireClosePopup: function (e) {
                e.stopPropagation();
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_DONE_ADDING_CARD);
            },

            render: function () {
                return (
                    <div className='pop pop-basic' onClick={this.requireClosePopup}>
                        <div className="pop-dialog">
                            <div className='pop-content'>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
);