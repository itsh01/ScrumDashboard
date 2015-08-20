define(['lodash', 'React', '../general/Search'], function (_, React, SearchMember) {
    'use strict';
    return React.createClass({
        displayName: 'Add existing member',
        propTypes: {
            allMembers: React.PropTypes.array,
            currentMember: React.PropTypes.object,
            team: React.PropTypes.object
        },
        contextTypes: {
            flux: React.PropTypes.any
        },

        getInitialState: function () {
            this.flux = this.context.flux;
            return {
                currentTeamMembers: this.getTeamMembers()
            };
        },

        addExistingMember: function () {
            var memberId = this.props.currentMember.id;
            var currentTeamId = this.props.team.id;
            this.flux.teamsActions.addMemberToTeam(currentTeamId, memberId);
        },

        getTeamMembers: function () {
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
                    <div className="team-management-button wide add-member-button" onClick={this.addExistingMember}>Add Member</div>
                </div>
            );
        }
    });
});
