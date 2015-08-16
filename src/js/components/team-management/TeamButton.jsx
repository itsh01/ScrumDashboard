define(['lodash', 'React', 'constants', 'DragDropMixin'],
    function (_, React, constants, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Team Button',
            propTypes: {
                team: React.PropTypes.object
            },
            contextTypes: {
                newFlux: React.PropTypes.any
            },
            mixins: [DragDropMixin],

            componentDidMount: function () {
                this.flux = this.context.newFlux;
                this.teamsStore = this.context.newFlux.teamsStore;
            },

            dragDrop: function () {
                return {
                    droppable: true,
                    acceptableDrops: ['memberId'],
                    drop: this.handleMoveMember
                };

            },

            handleMoveMember: function (memberId) {
                var currentTeamId = this.teamsStore.getCurrentTeam().id;
                this.flux.teamsActions.removeMemberFromTeam(currentTeamId, memberId);
                this.flux.teamsActions(this.props.team.id, memberId);

            },
            changeCurrentTeam: function (event) {
                var teamId = event.target.dataset.id;
                this.flux.teamsActions(teamId);

            },
            removeTeam: function (event) {
                event.stopPropagation();
                var teamId = event.target.id;
                this.flux.teamsActions(teamId);
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