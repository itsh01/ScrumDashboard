define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Heading',
        propTypes: {
            text: React.PropTypes.string
        },
        render: function () {
            return (<div className="table-cell">{this.props.text}</div>);
        }
    });
});