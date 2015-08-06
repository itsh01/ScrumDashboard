define([
        'React'

    ],
    function (React) {
        'use strict';
        return React.createClass({
            displayName: 'BasicPopUp',

            propTypes: {
                children: React.PropTypes.element
            },

            contextTypes: {
                flux: React.PropTypes.any
            },


            render: function () {
                return (
                    <div className='pop pop-basic' >
                        <div className="pop-dialog">
                            <div className='pop-content slide-down'>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
);