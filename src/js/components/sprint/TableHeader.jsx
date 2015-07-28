define(['lodash', 'React', 'components/sprint/TableHeading'], function (_, React, TableHeading) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Header',
        propTypes: {
            lifecycle: React.PropTypes.array
        },
        getDefaultProps: function () {
            return {lifecycle: ['Members', 'Backlog', 'In progress', 'Done']};
        },
        render: function () {
            var headings = _.map(this.props.lifecycle, function (text) {
                return <TableHeading text={text} />;
            });
            return (<div className="thead">
                <div className="table-row">
                    { headings }
                </div>
            </div>);
        }
    });
});