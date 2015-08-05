define(['lodash', 'React',
        'components/team-management/TeamView',
        'components/team-management/TeamSidebar',
        'ReactRouter'
    ],
    function (_, React, TeamView, TeamSidebar, Router) {
        'use strict';
        return React.createClass({
            displayName: 'TeamManagement',
            propTypes: {
                params: React.PropTypes.object,
                'params.id': React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            mixins: [Router.Navigation],
            getCurrentTeam: function () {
                return this.context.flux.teamsStore.getCurrentTeam();
            },
            getCurrentTeamMembers: function () {
                var currentTeam = this.context.flux.teamsStore.getCurrentTeam();
                return _.map(currentTeam.members, function (memberId) {
                    return this.context.flux.membersStore.getMemberById(memberId);
                }, this);
            },
            render: function () {
                var currentTeam = this.getCurrentTeam();
                var allTeams = this.context.flux.teamsStore.getAllTeams();
                return (
                    <div className='team-management'>
                        <TeamSidebar allTeams={allTeams}/>
                        <TeamView team={currentTeam}
                                  teamMembers={this.getCurrentTeamMembers()}/>
                    </div>
                );
            }
        });
    });