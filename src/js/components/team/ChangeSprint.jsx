
define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'ChangeSprint',

        propTypes: {
            handleSprintChangeFunc: React.PropTypes.func
        },

        render: function () {
            return (<div className='arrow {this.props.direction}'
                         onClick={this.props.handleSprintChangeFunc}>
                arrow
            </div>);
        }
    });

});
