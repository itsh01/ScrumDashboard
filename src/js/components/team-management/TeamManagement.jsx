define([
        'lodash',
        'React',

        'components/team-management/TeamSelector',
        'components/team-management/TeamView'
    ],
    function (_, React, TeamSelector, TeamView) {
    'use strict';

    return React.createClass({
        displayName: 'TeamManagement',
        propTypes: {
            allTeams: React.PropTypes.array,
            currentTeam: React.PropTypes.object
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        getCurrentTeamMembers: function () {
            return _.map(this.props.currentTeam.members, function (memberId) {
                return this.context.flux.membersStore.getMemberById(memberId);
            }, this);
        },
        render: function () {
            return (
                <div className='team-management'>
                    <TeamSelector teams={this.props.allTeams}/>
                    <TeamView team={this.props.currentTeam} teamMembers={this.getCurrentTeamMembers()}/>
                </div>
            );
        }
    });
});