define(['React'], function (React) {
    'use strict';
    return React.createClass({
        displayName: 'BasicPopUp',

        propTypes: {
            children: React.PropTypes.element
        },

        render: function () {
            return (
                <div className='pop pop-basic'>
                    {this.props.children}
                </div>
            );
        }
    });
});