define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog', 'components/team/EditSprint', 'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, EditSprint, constants) {
        'use strict';

        return React.createClass({
            displayName: 'TeamView',

            propTypes: {
                currTeamId: React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any,
                router: React.PropTypes.func
            },

            childContextTypes: {
                teamId: React.PropTypes.string
            },

            getInitialState: function () {
                var sprintValues = this.getSprintValues(this.props);
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, sprintValues.currSprint.id);
                return sprintValues;
            },


            getChildContext: function () {
                return {
                    teamId: this.props.currTeamId
                };
            },

            componentWillReceiveProps: function (nextProps) {
                var allSprints = this.context.flux.teamsStore.getTeamById(nextProps.currTeamId).sprints;
                var sprintsIds = _.map(allSprints, function (sprint) {
                    return sprint.id;
                });
                if (!this.state.currSprint.id || !_.contains(sprintsIds, this.state.currSprint.id)) {
                    var newState = this.getSprintValues(nextProps);
                    this.setState(newState);
                    this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, newState.currSprint.id);
                }
            },

            componentWillUnmount: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, null);
            },

            getSprintValues: function (props) {
                var team = this.getTeamObject(props.currTeamId);
                return {
                    currSprint: team.sprints[team.sprints.length - 1],
                    currSprintIndex: team.sprints.length - 1
                };
            },

            handleSprintChange: function (direction) {
                var allSprints = this.context.flux.teamsStore.getTeamById(this.props.currTeamId).sprints;
                var newState;
                if (direction === 'backwards' && this.state.currSprintIndex !== 0) {
                    newState = {
                        currSprint: allSprints[this.state.currSprintIndex - 1],
                        currSprintIndex: this.state.currSprintIndex - 1
                    };

                } else if (direction === 'forward' && this.state.currSprintIndex !== allSprints.length - 1) {

                    newState = {
                        currSprint: allSprints[this.state.currSprintIndex + 1],
                        currSprintIndex: this.state.currSprintIndex + 1
                    };
                }
                if (newState) {
                    this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, newState.currSprint.id);
                    this.setState(newState);
                }
            },

            getTeamObject: function (teamId) {
                return this.context.flux.teamsStore.getTeamById(teamId);
            },

            addCardClicked: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_ADD_CARD);
            },

            finishPlanningClicked: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.MOVE_SPRINT_TO_NEXT_STATE, this.state.currSprint.id);
                this.setState(this.getSprintValues({currTeamId: this.props.currTeamId}));

            },

            getSprintState: function () {
                if (this.state.currSprint.state === 0) {
                    return 'In Planning';
                }
                if (this.state.currSprint.state === 1) {
                    return 'In Progress';
                }
                return 'Locked';
            },

            planNewSprint: function () {
                var newSprint = this.context.flux.teamsStore.getBlankSprint();
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.ADD_SPRINT, this.props.currTeamId, newSprint);
            },

            getLockSprintButton: function () {
                if (this.state.currSprint.state === constants.SPRINT_STATUS.RETRO) {
                    return <button className='main-view-btn main-view-btn-lock' onClick={this.planNewSprint}>Plan New
                        Sprint</button>;
                }
                if (this.state.currSprint.state === constants.SPRINT_STATUS.PLANNING) {
                    return (<div className='main-view-buttons-container'>
                        <button className='main-view-btn' onClick={this.addCardClicked}>Add Card</button>
                        <button className='main-view-btn' onClick={this.finishPlanningClicked}>Finish Planning</button>
                    </div>);
                }
                return null;
            },

            render: function () {
                var team = this.getTeamObject(this.props.currTeamId);
                var sprintName = team.sprints[this.state.currSprintIndex].name;
                return (
                    <div>
                        <h1>{team.name} Team</h1>

                        <h2>Scrum DashBoard</h2>

                        <div className="flex-centered one-row">
                            <ChangeSprint direction='backwards'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'backwards')}/>

                            <h3>Sprint {this.state.currSprintIndex} : {sprintName} - {this.getSprintState()}</h3>
                            <ChangeSprint direction='forward'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'forward')}/>
                        </div>

                        <div className="flex-base  one-row">
                            <div style={{display: 'inline-block'}}>
                                <BackLog className="backlog"/>
                            </div>

                            <SprintTable sprint={this.state.currSprint}/>
                        </div>

                        {this.getLockSprintButton()}

                        <div>
                            <EditSprint teamId={this.props.team} sprintId={this.state.currSprint.id}/>
                        </div>
                    </div>
                );
            }
        });
    }
);

//