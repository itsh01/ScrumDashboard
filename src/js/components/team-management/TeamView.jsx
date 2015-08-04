define(['lodash', 'React', 'components/team-management/MemberProfile', 'ReactRouter'],
    function (_, React, MemberProfile, Router) {
    'use strict';
    return React.createClass({
        displayName: 'TeamView',
        propTypes: {
            team: React.PropTypes.object,
            teamMembers: React.PropTypes.array,
            teamName: React.PropTypes.string
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        mixins: [Router.Navigation],
        getTeamTitle: function () {
            return 'Team ' + this.props.teamName;
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