define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog'],
    function (_, React, ChangeSprint, SprintTable, BackLog) {
        'use strict';

        return React.createClass({
            displayName: 'TeamView',

            propTypes: {
                currTeamId: React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any
            },
            childContextTypes: {
                teamId: this.props.currTeamId
            },

            getInitialState: function () {
                return this.getSprintValues(this.props);
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
                            <BackLog className="backlog" teamId={team.id}/>
                            <SprintTable sprint={this.state.currSprint}/>
                        </div>
                    </div>
                );
            }
        });


    });


//<BackLog team=""/>
//<Sprint team=""/>