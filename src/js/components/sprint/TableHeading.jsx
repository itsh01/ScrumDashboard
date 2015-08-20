define([
        'lodash',
        'React'
    ],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'SprintTableHeading',
            propTypes: {
                text: React.PropTypes.string
            },
            render: function () {

                var isMemberHeading = this.props.text === 'Member';

                return (<div className="table-heading">
                    {isMemberHeading ? <i className="fa fa-user"></i> : null}
                    {this.props.text}
                </div>);
            }
        });
    }
);