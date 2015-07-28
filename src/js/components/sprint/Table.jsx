define([
        'lodash',
        'React',
        'components/sprint/TableHeader',
        'components/sprint/TableBody'
    ],
    function (_, React, TableHeader, TableBody) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',
            propTypes: {
                lifecycle: React.PropTypes.array
            },
            render: function () {
                return (<div className="table-layout board">
                    <TableHeader />
                    <TableBody />
                </div>);
            }
        });
    }
);