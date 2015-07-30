define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'TeamView',
        propTypes: {
            team: React.PropTypes.object
        },
        contextTypes: {
            flux: React.PropTypes.any
        },

        getTeamTitle: function () {
            return 'Team ' + this.props.team.name;
        },
        render: function () {
            return (
                <div>
                    <h1>{this.getTeamTitle()}</h1>
                    {
                        _.map(this.props.team.members, function (memberId) {
                            var member = this.context.flux.membersStore.getMemberById(memberId);
                            return <MemberProfile member={member} key={memberId}/>;
                        }, this)
                    }
                </div>
            );
        }
    });
});