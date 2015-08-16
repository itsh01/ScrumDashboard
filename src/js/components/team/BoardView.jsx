define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog', 'components/team/EditSprint', 'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, EditSprint, constants) {
        'use strict';

        return React.createClass({
            displayName: 'ScrumBoardView',

            contextTypes: {
                newFlux: React.PropTypes.any
            },
            childContextTypes: {
                teamId: React.PropTypes.string
            },
            getChildContext: function () {
                return {
                    teamId: this.context.newFlux.teamsStore.getCurrentTeam().id
                };
            },

            handleSprintChange: function (direction) {
                this.context.newFlux.teamsActions.changeCurrentSprintId(direction);
            },

            addCardClicked: function () {
                this.context.newFlux.planningActions.planningAddCard();
            },

            finishPlanning: function () {
                this.context.newFlux.teamsActions.moveSprintToNextState();
            },

            planNewSprint: function () {
                var newSprint = this.context.newFlux.teamsStore.getBlankSprint();
                this.context.newFlux.teamsActions.addSprintToCurrentTeam(newSprint);
                this.context.newFlux.teamsActions.changeCurrentSprintId('next');
            },

            lockSprint: function () {
                this.context.newFlux.teamsActions.retrofyCurrentSprint();
            },

            getSprintButton: function (sprint) {
                if (sprint.state === constants.SPRINT_STATUS.RETRO) {
                    return (<button className='home-view-button' onClick={this.planNewSprint}>Plan New Sprint</button>);
                }
                if (sprint.state === constants.SPRINT_STATUS.PLANNING) {
                    return (<div>
                        <div className='home-view-buttons-container'>
                            <button className='home-view-button' onClick={this.addCardClicked}>Add Card</button>
                            <button className='home-view-button' onClick={this.finishPlanning}>Finish Planning</button>
                        </div>
                        <div>
                            <EditSprint/>
                        </div>
                    </div>);
                }
                if (sprint.state === constants.SPRINT_STATUS.IN_PROGRESS) {
                    return (
                        <button className='home-view-button home-view-button-lock' onClick={this.lockSprint}>Lock
                            Sprint</button>
                    );
                }
                return null;
            },

            getSprintState: function (sprint) {
                if (sprint.state === 0) {
                    return 'In Planning';
                }
                if (sprint.state === 1) {
                    return 'In Progress';
                }
                return 'Locked';
            },

            render: function () {
                var team = this.context.newFlux.teamsStore.getCurrentTeam();
                var sprint = this.context.newFlux.teamsStore.getCurrentSprint();
                if (!team.id) {
                    return (
                        <div>
                            <h1>No Teams Found :(</h1>
                            <h2>Go ahead and add some in Manage Teams...</h2>
                        </div>
                    );
                }
                return (
                    <div>
                        <h1>{team.name} Team</h1>

                        <h2>Scrum DashBoard</h2>

                        <div className="flex-centered one-row">
                            <ChangeSprint direction='backwards'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'previous')}/>

                            <h3>Sprint {this.context.newFlux.teamsStore.getSprintIndex(sprint.id)} : {sprint.name}
                                - {this.getSprintState(sprint)}</h3>
                            <ChangeSprint direction='forward'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'next')}/>
                        </div>

                        <div className="flex-base  one-row">
                            <div style={{display: 'inline-block'}}>
                                <BackLog className="backlog" teamId={team.id}/>
                            </div>
                            <SprintTable sprint={sprint}/>
                        </div>

                        {this.getSprintButton(sprint)}

                    </div>
                );
            }
        });
    }
);

//