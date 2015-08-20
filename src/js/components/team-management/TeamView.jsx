define(['lodash', 'React',
        'components/team-management/MemberProfile',
        'components/team-management/NewMemberProfile'],
    function (_, React, MemberProfile, NewMemberProfile) {
        'use strict';
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return React.createClass({
            displayName: 'TeamView',
            propTypes: {
                allMembers: React.PropTypes.array,
                existingMember: React.PropTypes.object,
                team: React.PropTypes.object,
                teamMembers: React.PropTypes.array
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getTeamTitle: function () {
                return this.props.team.name ?
                this.props.team.name + ' Team' :
                    'Add a new team';
            },
            getNewMemberProfile: function () {
                var existingMember = this.props.existingMember;
                return this.props.team.name ?
                    <NewMemberProfile team={this.props.team} currentMember={existingMember}
                                      allMembers={this.props.allMembers}/> :
                    <div>Hiush</div>;
            },
            render: function () {
                return (
                    <div className='team-view'>
                        <h1 className='team-title'>{this.getTeamTitle()}</h1>
                        <ReactCSSTransitionGroup transitionName='member-profile-transition'>
                            {
                                _.map(this.props.teamMembers, function (member) {
                                    return member ? (<MemberProfile member={member} key={member.id}
                                                                    team={this.props.team}/>) :
                                        '';
                                }, this)
                            }
                        </ReactCSSTransitionGroup>
                        {this.getNewMemberProfile()}
                    </div>
                );
            }
        });
    });