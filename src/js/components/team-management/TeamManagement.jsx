define(['lodash', 'React',
        'components/team-management/TeamView',
        'components/team-management/TeamSidebar'],
    function (_, React, TeamView, TeamSidebar) {
        'use strict';
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return React.createClass({
            displayName: 'TeamManagement',

            propTypes: {
                params: React.PropTypes.object,
                'params.id': React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {

                return {
                    allMembers: this.context.flux.membersStore.getAllMembers()
                };

            },

            getCurrentTeam: function () {
                return this.context.flux.teamsStore.getCurrentTeam();
            },
            getCurrentTeamMembers: function () {
                var currentTeam = this.getCurrentTeam();
                return _.map(currentTeam.members, function (memberId) {
                    return this.context.flux.membersStore.getMemberById(memberId);
                }, this);
            },

            render: function () {
                var currentTeam = this.getCurrentTeam();
                var allTeams = this.context.flux.teamsStore.getAllActiveTeams();
                return (
                    <ReactCSSTransitionGroup transitionName='team-management-transition' transitionAppear={true}>
                        <div className='team-management'>
                            <TeamSidebar allTeams={allTeams}/>
                            <TeamView team={currentTeam}
                                      teamMembers={this.getCurrentTeamMembers()}
                                      allMembers={this.state.allMembers}/>
                        </div>
                    </ReactCSSTransitionGroup>
                );
            }
        });
    });