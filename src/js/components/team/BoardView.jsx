define([
        'lodash',
        'React',

        'components/team/ChangeSprint',
        'components/sprint/Table',
        'components/backlog/Backlog',
        'components/team/EditSprint',
        'components/team/SprintData',

        'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, EditSprint, SprintData, constants) {
        'use strict';

        return React.createClass({
            displayName: 'ScrumBoardView',

            contextTypes: {
                flux: React.PropTypes.any
            },
            childContextTypes: {
                teamId: React.PropTypes.string
            },
            getChildContext: function () {
                return {
                    teamId: this.context.flux.teamsStore.getCurrentTeam().id
                };
            },

            handleSprintChange: function (direction) {
                this.context.flux.teamsActions.moveCurrentSprintId(direction);
            },

            addCardClicked: function () {
                this.context.flux.planningActions.planningAddCard();
            },

            finishPlanning: function () {
                this.context.flux.teamsActions.moveSprintToNextState();
            },

            planNewSprint: function () {
                var newSprint = this.context.flux.teamsStore.getBlankSprint();
                this.context.flux.teamsActions.addSprint(newSprint);
                this.context.flux.teamsActions.moveCurrentSprintId(true);
            },

            lockSprint: function () {
                this.context.flux.teamsActions.retrofySprint();
            },

            getSprintButton: function (sprint) {
                if (sprint.state === constants.SPRINT_STATUS.RETRO) {
                    return (<button className='home-view-button' onClick={this.planNewSprint}>Plan New Sprint</button>);
                }
                if (sprint.state === constants.SPRINT_STATUS.PLANNING) {
                    return (<div>
                        <div>
                            <EditSprint/>
                        </div>
                        <div className='home-view-buttons-container'>
                            <button className='home-view-button' onClick={this.finishPlanning}>Finish Planning</button>
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

            renderIfNoTeams: function () {
                return (
                    <div>
                        <h1>No Teams Found :(</h1>

                        <h2>Go ahead and add some in Manage Teams...</h2>
                    </div>
                );
            },

            renderIfNoSprintInCurrTeam: function (teamName, teamId) {
                return (
                    <div>
                        <h1>{teamName} Team</h1>

                        <h2>Scrum DashBoard</h2>

                        <div className="flex-base  one-row">
                            <div style={{display: 'inline-block'}}>
                                <BackLog className="backlog" teamId={teamId}/>
                            </div>
                        </div>

                        {this.getSprintButton({state: constants.SPRINT_STATUS.RETRO})}
                    </div>
                );
            },

            render: function () {
                var team = this.context.flux.teamsStore.getCurrentTeam();
                var sprint = this.context.flux.teamsStore.getCurrentSprint();
                if (!team.id) {
                    return this.renderIfNoTeams();
                }
                if (!sprint.id) {
                    return this.renderIfNoSprintInCurrTeam(team.name, team.id);
                }
                return (
                    <div>
                        <h2>{team.name} Team</h2>

                        <div className="flex-centered one-row">
                            <ChangeSprint direction='backwards'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, false)}/>

                            <h3>Sprint {this.context.flux.teamsStore.getSprintIndex(sprint.id)} : {sprint.name}
                                - {this.getSprintState(sprint)}</h3>
                            <ChangeSprint direction='forward'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, true)}/>
                        </div>
                        <SprintData sprint={sprint} />

                        <div className="flex-base  one-row">
                            <div style={{display: 'inline-block'}}>
                                <BackLog className="backlog" teamId={team.id}/>
                            </div>
                            <SprintTable sprint={sprint}/>
                            {this.getSprintButton(sprint)}
                        </div>


                    </div>
                );
            }
        });
    }
);

//