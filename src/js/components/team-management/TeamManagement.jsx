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
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any
            },

            getInitialState: function () {
                return {
                    allMembers: this.context.newFlux.membersStore.getAllMembers()
                };

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
                this.setState({allMembers: this.context.newFlux.membersStore.getAllMembers()});
            },

            getCurrentTeam: function () {
                return this.context.newFlux.teamsStore.getCurrentTeam();
            },
            getCurrentTeamMembers: function () {
                var currentTeam = this.getCurrentTeam();
                return _.map(currentTeam.members, function (memberId) {
                    return this.context.newFlux.membersStore.getMemberById(memberId);
                }, this);
            },

            render: function () {
                var currentTeam = this.getCurrentTeam();
                var allTeams = this.context.newFlux.teamsStore.getAllActiveTeams();
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