define(['lodash', 'React', 'components/team-management/TeamSelector', 'components/team-management/TeamView'], function (_, React, TeamSelector, TeamView) {
    'use strict';
    return React.createClass({
        displayName: 'TeamManagement',
        contextTypes: {
            flux: React.PropTypes.any
        },
        render: function () {
            var allTeams = this.context.flux.teamsStore.getAllTeams();
            return (
                <div className='team-management'>
                    <TeamSelector teams={allTeams}/>
                    <TeamView team={allTeams[0]}/>
                </div>
            );
        }
    });
});