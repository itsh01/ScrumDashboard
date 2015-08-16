define(['lodash', 'React', 'constants', 'DragDropMixin'],
    function (_, React, constants, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Team Button',
            propTypes: {
                currentTeam: React.PropTypes.object,
                team: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            mixins: [DragDropMixin],

            componentDidMount: function () {
                this.flux = this.context.flux;
            },

            dragDrop: function () {
                return {
                    droppable: true,
                    acceptableDrops: ['memberId'],
                    drop: this.handleMoveMember
                };

            },

            handleMoveMember: function (memberId) {
                var currentTeamId = this.props.currentTeam.id;
                this.flux.teamsActions.removeMemberFromTeam(currentTeamId, memberId);
                this.flux.teamsActions.addMemberToTeam(this.props.team.id, memberId);

            },
            changeCurrentTeam: function (event) {
                var teamId = event.target.dataset.id;
                this.flux.teamsActions.changeCurrentTeamId(teamId);

            },
            removeTeam: function (event) {
                event.stopPropagation();
                var teamId = event.target.id;
                this.flux.teamsActions.deactivateTeam(teamId);
            },
            render: function () {
                var team = this.props.team;
                return (
                    <div className='team-management-button' onClick={this.changeCurrentTeam} key={team.id}
                         data-id={team.id}>
                        <div className='team-name' data-id={team.id} key={team.name}>{team.name}
                        </div>
                        <button onClick={this.removeTeam}
                                className='remove-button'
                                id={team.id}>X
                        </button>
                    </div>
                );
            }
        });
    });