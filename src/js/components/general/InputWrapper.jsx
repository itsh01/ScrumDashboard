define([
        'lodash',
        'React'
    ],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'InputWrapper',

            propTypes: {
                fields: React.PropTypes.any,
                text: React.PropTypes.string
            },

            render: function () {
                return (
                    <div className='input-section'>
                        <div className='input-section-label'>
                            <span>{this.props.text}</span>
                        </div>
                        <div className='input-section-field'>
                            {this.props.fields}
                        </div>
                    </div>
                );
            }
        });
    }
);
