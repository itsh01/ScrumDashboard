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
            childContextTypes: {
                blankMemberSchema: React.PropTypes.array
            },


            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any
            },

            getChildContext: function () {
                return {
                    blankMemberSchema: this.context.newFlux.membersStore.getBlankMember()
                };
            },

            getStateFromStore: function () {
                var existingMemberId = this.context.newFlux.teamsStore.getCurrentExistingMemberId();
                var existingMember = this.context.newFlux.membersStore.getMemberById(existingMemberId);
                return {
                    allMembers: this.context.newFlux.membersStore.getAllMembers(),
                    existingMember: existingMember
                };
            },
            getInitialState: function () {
                return this.getStateFromStore();
            },
            componentDidMount: function () {
                this.context.newFlux.teamsStore.addChangeListener(this._onChange);
                this.context.newFlux.membersStore.addChangeListener(this._onChange);
            },

            componentWillUnmount: function () {
                this.context.newFlux.teamsStore.removeChangeListener(this._onChange);
                this.context.newFlux.membersStore.removeChangeListener(this._onChange);
            },

            _onChange: function () {
                this.setState(this.getStateFromStore());
            },

            getCurrentTeam: function () {
                return this.context.newFlux.teamsStore.getCurrentTeam() || {};
            },
            getTeamMembers: function (team) {
                return _.map(team.members, function (memberId) {
                    return this.context.newFlux.membersStore.getMemberById(memberId);
                }, this);
            },

            render: function () {
                var currentTeam = this.getCurrentTeam();
                var allTeams = this.context.newFlux.teamsStore.getAllActiveTeams();
                return (
                    <ReactCSSTransitionGroup transitionName='team-management-transition' transitionAppear={true}>
                        <div className='team-management'>
                            <TeamSidebar allTeams={allTeams} currentTeam={currentTeam}/>
                            <TeamView team={currentTeam}
                                      teamMembers={this.getTeamMembers(currentTeam)}
                                      allMembers={this.state.allMembers}
                                      existingMember={this.state.existingMember}
                                />
                        </div>
                    </ReactCSSTransitionGroup>
                );
            }
        });
    });