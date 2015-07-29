define(['lodash', 'React', 'components/team/TeamComponent'], function (_, React, TeamView) {
    'use strict';

    return React.createClass({
        displayName: 'TeamManagement',

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
                currTeam: this.context.flux.teamsStore.getAllTeams()[0]
            };
        },

        render: function () {
            var teamNames = _.map(this.state.teams, function (team) {
                return (<option value="{team.id}">{team.name}</option>);
            });
            return (<div className="teamManagement-container">
                    <div className="header">
                        <div className="left">
                            <span>Choose Team: </span>
                            <select>
                                {teamNames}
                            </select>
                        </div>

                        <div className="right">
                            <button>Manage Teams</button>
                        </div>
                    </div>

                    <div className="team-view">
                        <TeamView />
                    </div>
                </div>
            );
        }
    });

});