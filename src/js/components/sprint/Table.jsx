
define([
        'lodash',
        'React',
        'components/sprint/TableBody'
    ],
    function (_, React, TableBody, TableHeader) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',
            render: function () {
                return (<div className="table-layout">
                    <TableHeader lifecycle={['members', 'backlog', 'in progress', 'done', 'released']} />
                    <TableBody />
                </div>);
            }
        });
    }
);