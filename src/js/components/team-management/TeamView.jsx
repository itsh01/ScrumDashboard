define(['lodash', 'React',
        'components/team-management/MemberProfile',
        'components/team-management/NewMemberProfile'],
    function (_, React, MemberProfile, NewMemberProfile) {
        'use strict';
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return React.createClass({
            displayName: 'TeamView',
            propTypes: {
                team: React.PropTypes.object,
                teamMembers: React.PropTypes.array
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getTeamTitle: function () {
                return this.props.team.name ?
                'Team ' + this.props.team.name :
                    'Add a new team';
            },
            getNewMemberProfile: function () {
                var existingMemberId = this.context.flux.teamsStore.getCurrentExistingMemberId();
                var existingMember = this.context.flux.membersStore.getMemberById(existingMemberId);
                return this.props.team.name ?
                    <NewMemberProfile team={this.props.team} currentMember={existingMember}/> :
                    <div>Hiush</div>;
            },
            render: function () {
                return (
                    <div className='team-view'>
                        <h1 className='team-title'>{this.getTeamTitle()}</h1>
                        <ReactCSSTransitionGroup transitionName='member-profile-transition'>
                            {
                                _.map(this.props.teamMembers, function (member) {
                                    return <MemberProfile member={member} key={member.id}/>;
                                }, this)
                            }
                        </ReactCSSTransitionGroup>
                        {this.getNewMemberProfile()}
                    </div>
                );
            }
        });
    });