/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',
        'components/sprint/Table',
        'components/team/TeamComponent'
    ],
    function (_, React, SprintTable, TeamView) {
        'use strict';

        return React.createClass({
            displayName: 'Main',
            render: function () {
                return (<div>
                    <div>Scrum</div>
                    <TeamView />
                </div>);
            }
        });
    }
);
