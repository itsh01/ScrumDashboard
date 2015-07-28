define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Heading',
        propTypes: {
            heading: React.PropTypes.array
        },
        render: function () {
            return (<div className="table-heading">this.props.heading</div>);
        }
    });
});