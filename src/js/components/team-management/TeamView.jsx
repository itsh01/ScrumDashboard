define(['lodash', 'React',
        'components/team-management/MemberProfile', 'ReactRouter',
        'components/team-management/NewMemberProfile'],
    function (_, React, MemberProfile, Router, NewMemberProfile) {
    'use strict';
    return React.createClass({
        displayName: 'TeamView',
        propTypes: {
            team: React.PropTypes.object,
            teamMembers: React.PropTypes.array
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        mixins: [Router.Navigation],
        getTeamTitle: function () {
            return 'Team ' + this.props.team.name;
        },
        render: function () {
            return (
                <div className='team-view'>
                    <h1 className='team-title'>{this.getTeamTitle()}</h1>
                    {
                        _.map(this.props.teamMembers, function (member) {
                            return <MemberProfile member={member} key={member.id}/>;
                        }, this)
                    }
                    <NewMemberProfile team={this.props.team}/>
                </div>
            );
        }
    });
});