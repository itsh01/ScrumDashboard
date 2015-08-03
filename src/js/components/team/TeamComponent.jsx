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
<<<<<<< HEAD
            childContextTypes: {
                teamId: this.props.currTeamId
=======

            childContextTypes: {
                teamId: React.PropTypes.string
>>>>>>> origin/master
            },

            getInitialState: function () {
                return this.getSprintValues(this.props);
            },

            getChildContext: function () {
                return {
                    teamId: this.props.currTeamId
                };
            },

            componentWillReceiveProps: function (nextProps) {
                this.setState(this.getSprintValues(nextProps));
            },

            handleSprintChange: function (direction) {
                var allSprints = this.context.flux.teamsStore.getTeamById(this.props.currTeamId).sprints;
                if (direction === 'backwards' && this.state.currSprintIndex !== 0) {
                    this.setState({
                        currSprint: allSprints[this.state.currSprintIndex - 1],
                        currSprintIndex: this.state.currSprintIndex - 1
                    });
                } else if (direction === 'forward' && this.state.currSprintIndex !== allSprints.length - 1) {

                    this.setState({
                        currSprint: allSprints[this.state.currSprintIndex + 1],
                        currSprintIndex: this.state.currSprintIndex + 1
                    });
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
                return this.state.currSprint.state === 'planning' ?
                    <button onClick={this.addCardClicked}>Add Card</button> :
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

<<<<<<< HEAD
                        <div className="flex-base  one-row">
                            <BackLog className="backlog" teamId={team.id}/>
                            <SprintTable sprint={this.state.currSprint}/>
                        </div>
=======
                    <div className="flex-base  one-row">
                        {this.addCardBtn()}
                        <BackLog className="backlog" teamId={team.id}/>
                        <SprintTable sprint={this.state.currSprint}/>
>>>>>>> origin/master
                    </div>
                );
            }
        });


    });


//<BackLog team=""/>
//<Sprint team=""/>