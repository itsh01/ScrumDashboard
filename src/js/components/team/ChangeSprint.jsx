
define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'ChangeSprint',

        propTypes: {
            direction: React.PropTypes.string,
            handleSprintChangeFunc: React.PropTypes.func
        },

        getClass: function () {
            return 'arrow ' + this.props.direction;
        },

        render: function () {
            return (<div className={this.getClass()}
                         onClick={this.props.handleSprintChangeFunc}>
            </div>);
        }
    });

});
