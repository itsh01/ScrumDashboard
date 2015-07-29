define([
        'lodash',
        'React',
        'components/sprint/TableHeading'
    ],
    function (_, React, TableHeading) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Header',
            propTypes: {
                cardLifecycle: React.PropTypes.array
            },
            render: function () {
                var headings = _.map(this.props.cardLifecycle, function (text) {
                    return <TableHeading text={text} key={text} />;
                });
                return (<div className="thead sprint-head">
                    <div className="table-row">
                        <TableHeading text={"Member"} key={"member"} />
                        { headings }
                    </div>
                </div>);
            }
        });
    }
);