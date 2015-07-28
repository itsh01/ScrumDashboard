/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',
        'components/sprint/Table'
    ],
    function (_, React, SprintTable) {
        'use strict';

        return React.createClass({
            displayName: 'Main',
            render: function () {
                return (<div>
                    <div>Scrum</div>
                    <SprintTable />
                </div>);
            }
        });
    }
);
