
define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'TeamManagement',

        propTypes: {

        },

        render: function () {
            return (<div className="teamManagementContainer"
                         onClick={this.props.handleSprintChangeFunc}>
            </div>);
        }
    });

});