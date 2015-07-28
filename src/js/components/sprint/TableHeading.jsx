define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Heading',
        propTypes: {
            text: React.PropTypes.string
        },
        render: function () {
            return (<div className="table-heading">{this.props.text}</div>);
        }
    });
});