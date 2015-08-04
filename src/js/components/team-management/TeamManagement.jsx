define(['lodash', 'React',
        'components/team-management/TeamView',
        'components/team-management/TeamSidebar',
        'ReactRouter'
    ],
    function (_, React, TeamView, TeamSidebar, Router) {
        'use strict';
        var Link = Router.Link;
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
            myFlux: this.context.flux,
            getCurrentTeam: function () {
                return this.myFlux.teamsStore.getTeamById(this.props.params.id) || this.myFlux.teamsStore.getCurrentTeam();
            },
            getCurrentTeamMembers: function () {
                var currentTeam = this.getCurrentTeam();
                return _.map(currentTeam.members, function (memberId) {
                    return this.context.flux.membersStore.getMemberById(memberId);
                }, this);
            },
            render: function () {
                var currentTeam = this.getCurrentTeam();
                return (
                    <div className='team-management'>
                        <Link to='app'>Go Home</Link>
                        <TeamSidebar allTeams={this.myFlux.teamsStore.getAllTeams()}/>
                        <TeamView team={this.context.flux.teamsStore.getCurrentTeam()}
                                  teamName={currentTeam.name}
                                  teamMembers={this.getCurrentTeamMembers()}/>
                    </div>
                );
            }
        });
    });