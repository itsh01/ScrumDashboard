define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog', 'components/team/EditSprint', 'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, EditSprint, constants) {
        'use strict';

        return React.createClass({
            displayName: 'TeamView',

            contextTypes: {
                flux: React.PropTypes.any
            },

            handleSprintChange: function (direction) {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, direction);
            },

            addCardClicked: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_ADD_CARD);
            },

            finishPlanning: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE);
            },

            planNewSprint: function () {
                var newSprint = this.context.flux.teamsStore.getBlankSprint();
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.ADD_SPRINT_TO_CURRENT_TEAM, newSprint);
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, 'next');
            },

            lockSprint: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.RETROFY_CURRENT_SPRINT);
            },

            getSprintButton: function (sprint) {
                if (sprint.state === constants.SPRINT_STATUS.RETRO) {
                    return (<button className='main-view-btn' onClick={this.planNewSprint}>Plan New Sprint</button>);
                }
                if (sprint.state === constants.SPRINT_STATUS.PLANNING) {
                    return (<div>
                        <div className='main-view-buttons-container'>
                            <button className='main-view-btn' onClick={this.addCardClicked}>Add Card</button>
                            <button className='main-view-btn' onClick={this.finishPlanning}>Finish Planning</button>
                        </div>
                        <div>
                            <EditSprint/>
                        </div>
                    </div>);
                }
                if (sprint.state === constants.SPRINT_STATUS.IN_PROGRESS) {
                    return <button className = 'main-view-btn main-view-btn-lock' onClick={this.lockSprint}>Lock Sprint</button>;
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
                var team = this.context.flux.teamsStore.getCurrentTeam();
                var sprint = this.context.flux.teamsStore.getCurrentSprint();
                return (
                    <div>
                        <h1>{team.name} Team</h1>
                        <h2>Scrum DashBoard</h2>
                        <div className="flex-centered one-row">
                            <ChangeSprint direction='backwards'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'previous')}/>
                            <h3>Sprint {this.context.flux.teamsStore.getSprintIndex(sprint.id)} : {sprint.name} - {this.getSprintState(sprint)}</h3>
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