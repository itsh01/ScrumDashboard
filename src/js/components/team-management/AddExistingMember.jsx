define(['lodash', 'React', '../general/Search', 'constants'], function (_, React, SearchMember, constants) {
    'use strict';
    return React.createClass({
        displayName: 'Add existing member',
        propTypes: {
            currentMember: React.PropTypes.object,
            team: React.PropTypes.object,
            allMembers: React.PropTypes.array
        },
        contextTypes: {
            flux: React.PropTypes.any
        },

        getInitialState: function () {

            this.dispatcher = this.context.flux.dispatcher;
            this.membersStore = this.context.flux.membersStore;

            return {
                currentTeamMembers: this.getCurrentTeamMembers()
            };
        },

        addExistingMember: function () {
            var memberId = this.props.currentMember.id;
            var currentTeamId = this.props.team.id;
            this.dispatcher.dispatchAction(constants.actionNames.ADD_MEMBER_TO_TEAM, currentTeamId, memberId);
        },

        getCurrentTeamMembers: function () {
            return this.props.team && this.props.team.members;
        },

        render: function render() {
            return (
                <div className='add-existing-member'>
                    <div className='search-bar'>
                        <SearchMember searchCollection={this.props.allMembers}
                                      excludedCollection={this.state.currentTeamMembers}/>
                        <img className='member-img'
                             alt={this.props.currentMember.name}
                             src={this.props.currentMember.image}/>
                    </div>
                    <div className="team-management-button" onClick={this.addExistingMember}>Add Member</div>
                </div>
            );
        }
    });
});
