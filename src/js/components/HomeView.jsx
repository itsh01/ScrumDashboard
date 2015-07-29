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
            return {
                teams: this.context.flux.teamsStore.getAllTeams(),
                currTeamId: this.context.flux.teamsStore.getAllTeams()[0].id
            };
        },

        handleChangeTeam: function (e) {
            this.setState({currTeamId: e.target.value});
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
                            </select>
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