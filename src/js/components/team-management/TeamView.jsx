define(['lodash', 'React', 'components/team-management/MemberProfile'],
    function (_, React, MemberProfile) {
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

        getTeamTitle: function () {
            return 'Team ' + this.props.team.name;
        },
        render: function () {
            return (
                <div className='team-view'>
                    <h1>{this.getTeamTitle()}</h1>
                    {
                        _.map(this.props.teamMembers, function (member) {
                            return <MemberProfile member={member} key={member.Id}/>;
                        }, this)
                    }
                </div>
            );
        }
    });
});