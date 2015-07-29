define(['lodash', 'React', 'components/team/TeamComponent'], function (_, React, TeamView) {
    'use strict';

    return React.createClass({
        displayName: 'HomeView',

        propTypes: {
            currTeam: React.PropTypes.object,
            teams: React.PropTypes.array
        },

        contextTypes: {
            flux: React.PropTypes.any
        },

        getInitialState: function () {
            var teams = this.context.flux.teamsStore.getAllTeams();
            return {
                teams: teams,
                currTeamId: teams[0].id
            };
        },

        handleChangeTeam: function (e) {
            this.setState({currTeamId: e.target.value});
            console.log(this.state.currTeamId);
        },

        render: function () {
            var teamsOptions = _.map(this.state.teams, function (team) {
                return (<option value={team.id}>{team.name}</option>);
            });
            return (<div className="teamManagement-container">
                    <div className="header">
                        <div className="left">
                            <span>Choose Team: </span>
                            <select onChange={this.handleChangeTeam}>
                                {teamsOptions}
                            </select>CardsContainer
                        </div>

                        <div className="right">
                            <button>Manage Teams</button>
                        </div>
                    </div>

                    <div className="team-view">
                        <TeamView currTeamId={this.state.currTeamId}/>
                    </div>
                </div>
            );
        }
    });

});