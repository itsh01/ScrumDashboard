define(['lodash', 'React'], function (_, React, TableHeading) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Header',
        propTypes: {
            lifecycle: React.PropTypes.array
        },
        getDefaultProps: function () {
            return {lifecycle: ['members', 'backlog', 'in progress', 'done', 'released']};
        },
        render: function () {
            var headings = _.map(this.props.lifecycle, function (text) {
                return <TableHeading text={text} />;
            });
            return (<div className="thead">
                { headings }
            </div>);
        }
    });
});