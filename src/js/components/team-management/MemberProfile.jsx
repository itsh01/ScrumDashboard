define(['lodash', 'React', 'constants'], function (_, React, constants) {
    'use strict';
    return React.createClass({
        displayName: 'Member Profile',
        propTypes: {
            member: React.PropTypes.object
        },

        contextTypes: {
            flux: React.PropTypes.any
        },

        removeMember: function (event) {
            var memberId = event.target.id;
            var teamId = this.context.flux.teamsStore.getCurrentTeam().id;
            console.log(teamId);
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.REMOVE_MEMBER_FROM_TEAM, teamId, memberId);
        },
        render: function () {
            var classSet = React.addons.classSet;
            return (
                <div className={classSet('member-profile', 'inline-block')}>
                    <h3 className={classSet('member-name')}>{this.props.member.name}</h3>
                    <img className='member-img'
                         alt={this.props.member.name}
                         src={this.props.member.image}/>
                    <button className='remove-button' onClick={this.removeMember} id={this.props.member.id}>X</button>
                </div>
            );
        }
    });
});



