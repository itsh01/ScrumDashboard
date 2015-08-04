define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog', 'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, constants) {
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
                this.setState(this.getSprintValues(nextProps));
            },

            componentWillUnmount: function(){
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, null);
            },
            handleSprintChange: function (direction) {
                var allSprints = this.context.flux.teamsStore.getTeamById(this.props.currTeamId).sprints;
                var newState;
                if (direction === 'backwards' && this.state.currSprintIndex !== 0) {
                    newState={
                        currSprint: allSprints[this.state.currSprintIndex - 1],
                        currSprintIndex: this.state.currSprintIndex - 1
                    };

                } else if (direction === 'forward' && this.state.currSprintIndex !== allSprints.length - 1) {

                    newState = {
                        currSprint: allSprints[this.state.currSprintIndex + 1],
                        currSprintIndex: this.state.currSprintIndex + 1
                    };
                }
                if(newState) {
                    this.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, newState.currSprint.id);
                    this.setState(newState);
                }
            },

            getTeamObject: function (teamId) {
                return this.context.flux.teamsStore.getTeamById(teamId);
            },

            getSprintValues: function (props) {
                var team = this.getTeamObject(props.currTeamId);
                return {
                    currSprint: team.sprints[team.sprints.length - 1],
                    currSprintIndex: team.sprints.length - 1
                };
            },

            addCardClicked: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.PLANNING_ADD_CARD);
            },

            addCardBtn: function () {
                return this.state.currSprint.state === constants.SPRINT_STATUS.PLANNING ?
                    <button className='team-view-btn' onClick={this.addCardClicked}>Add Card</button> :
                    null;
            },

            render: function () {
                var team = this.getTeamObject(this.props.currTeamId);
                return (
                    <div>
                        <h1>{team.name} Team</h1>

                        <h2>Scrum DashBoard</h2>

                        <div className="flex-centered one-row">
                            <ChangeSprint direction='backwards'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'backwards')}/>

                            <h3>Sprint: {this.state.currSprintIndex}</h3>
                            <ChangeSprint direction='forward'
                                          handleSprintChangeFunc={this.handleSprintChange.bind(this, 'forward')}/>
                        </div>

                        <div className="flex-base  one-row">
                            <div style={{display: 'inline-block'}}>
                                {this.addCardBtn()}
                                <BackLog className="backlog"/>
                            </div>
                            <SprintTable sprint={this.state.currSprint}/>
                        </div>
                    </div>
                );
            }
        });
    }
);

