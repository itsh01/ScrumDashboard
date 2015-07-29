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

            getInitialState: function () {
                var team = this.context.flux.teamsStore.getTeamById(this.props.currTeamId)[0];
                console.log(this.props.currTeamId);
                console.log(team);
                return {
                    team: team,
                    currSprint: team.sprints[team.sprints.length - 1],
                    currSprintIndex: team.sprints.length - 1
                };
            },

            handleSprintChange: function (direction) {
                var allSprints = this.context.flux.teamsStore.getTeamById(this.props.currTeamId).sprints;
                if (direction === 'backwards' && this.state.currSprintIndex !== 0) {
                    this.setState({currSprint: allSprints[this.state.currSprintIndex - 1]});
                } else if (direction === 'forward' && this.state.currSprintIndex !== this.state.team.sprints.length - 1) {
                    this.setState({currSprint: allSprints[this.state.currSprintIndex + 1]});
                }
            },

            render: function () {
                return (<div>
                    <h1>{this.state.team.name} Team</h1>

                    <h2>Scrum DashBoard</h2>

                    <div className="flex-centered one-row">
                        <ChangeSprint direction='backwards'
                                      handleSprintChangeFunc={this.handleSprintChange.bind(this, 'backwards')}/>
                        <h3>Sprint: {this.state.currSprint}</h3>
                        <ChangeSprint direction='forward'
                                      handleSprintChangeFunc={this.handleSprintChange.bind(this, 'forward')}/>
                    </div>

                    <div className="flex-centered  one-row">
                        <div className="backlog">
                            <BackLog teamId={this.state.team.id}/>
                        </div>
                        <SprintTable sprint={this.state.currSprint}/>
                    </div>
                </div>);
            }
        });


    });


//<BackLog team=""/>
//<Sprint team=""/>