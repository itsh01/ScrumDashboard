define(['lodash', 'React', '../general/Search', 'constants'], function (_, React, SearchMember, constants) {
    'use strict';
    return React.createClass({
        displayName: 'Add existing member',
        contextTypes: {
            flux: React.PropTypes.any
        },
        propTypes: {
            currentMember: React.PropTypes.object,
            team: React.PropTypes.object
        },


        getInitialState: function () {

            this.dispatcher = this.context.flux.dispatcher;
            this.teamsStore = this.context.flux.teamsStore;
            this.membersStore = this.context.flux.membersStore;

            return {
                allMembers: this.getAllMembers(),
                currentTeamMembers: this.getCurrentTeamMembers()
            };
        },

        addExistingMember: function () {
            var memberId = this.props.currentMember.id;
            var currentTeamId = this.teamsStore.getCurrentTeam().id;
            this.dispatcher.dispatchAction(constants.actionNames.ADD_MEMBER_TO_TEAM, currentTeamId, memberId);
        },
        getAllMembers: function () {
            return this.membersStore && this.membersStore.getAllMembers();
        },

        getCurrentTeamMembers: function () {
            return this.teamsStore && this.teamsStore.getCurrentTeam().members;
        },

        render: function render() {
            return (
                <div className='add-existing-member'>
                    <div className='search-bar'>
                        <SearchMember searchCollection={this.state.allMembers}
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
