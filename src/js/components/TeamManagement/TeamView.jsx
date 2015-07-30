define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'TeamView',
        propTypes: {
            team: React.PropTypes.object
        },

        getTeamTitle: function () {
            return 'Team ' + this.props.team.name;
        },
        render: function () {
            return (
                <h1>{this.getTeamTitle()}</h1>
            );
        }
    });
});