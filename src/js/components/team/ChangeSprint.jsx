
define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'ChangeSprint',

        render: function () {
            return (<div className='arrow {this.props.direction}'
                         onClick={this.props.handleSprintChangeFunc}>
                arrow
            </div>);
        }
    });

});
