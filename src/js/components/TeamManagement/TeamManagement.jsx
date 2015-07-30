define(['lodash', 'React', 'components/teamManagement/TeamSelector'], function (_, React, TeamSelector) {
    'use strict';
    return React.createClass({
        displayName: 'TeamManagement',
        contextTypes: {
            flux: React.PropTypes.any
        },
        render: function () {
            return (
                <div className='team-management'>
                    <TeamSelector teams={this.context.flux.teamsStore.getAllTeams()}/>
                    <div className="team-members">
                    </div>
                </div>
            );
        }
    });
});