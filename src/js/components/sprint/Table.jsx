
define([
        'lodash',
        'React',
        'components/sprint/TableBody'
    ],
    function (_, React, TableBody) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',
            propTypes: {
                lifecycle: React.PropTypes.array
            },
            render: function () {
                return (<div className="table-layout">
                    <TableBody />
                </div>);
            }
        });
    }
);