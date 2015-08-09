define(['lodash', 'React', 'constants', 'DragDropMixin'],
    function (_, React, constants, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Team Button',
            propTypes: {
                team: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            mixins: [DragDropMixin],
            dragDrop: function () {
                return {
                    droppable: true,
                    acceptableDrops: ['memberId'],
                    drop: this.handleMoveMember
                };

            },

            componentDidMount: function () {
                this.dispatcher = this.context.flux.dispatcher;
                this.teamsStore = this.context.flux.teamsStore;
            },


            handleMoveMember: function (memberId) {
                var currentTeamId = this.teamsStore.getCurrentTeam().id;
                this.dispatcher.dispatchAction(constants.actionNames.REMOVE_MEMBER_FROM_TEAM, currentTeamId, memberId);
                this.dispatcher.dispatchAction(constants.actionNames.ADD_MEMBER_TO_TEAM, this.props.team.id, memberId);

            },
            changeCurrentTeam: function (event) {
                var teamId = event.target.dataset.id;
                this.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM, teamId);

            },
            removeTeam: function (event) {
                event.stopPropagation();
                var teamId = event.target.id;
                this.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_TEAM, teamId);
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