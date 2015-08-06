define(['lodash', 'React', 'components/team/TeamComponent', 'constants'], function (_, React, TeamView, constants) {
    'use strict';
    return React.createClass({
        displayName: 'HomeView',

        propTypes: {
            currTeam: React.PropTypes.object,
            params: React.PropTypes.object,
            query: React.PropTypes.object
        },

        contextTypes: {
            flux: React.PropTypes.any
        },


        getTeams: function () {
            return this.context.flux.teamsStore.getAllTeams();
        },

        clearStorage: function () {
            localStorage.clear();
        },

        handleChangeTeam: function (e) {
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM, e.target.value);
            var team = this.context.flux.teamsStore.getTeamById(e.target.value);
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, team.sprints[team.sprints.length - 1].id);
        },

        render: function () {
            var teamsOptions = _.map(this.getTeams(), function (team) {
                return (<option value={team.id} key={team.id}>{team.name}</option>);
            });
            return (
                <div>
                    <div className="header">
                        <div className="left">
                            <span>Choose Team: </span>
                            <select onChange={this.handleChangeTeam} value={null}>
                                <option value={null} disabled>-</option>
                                {teamsOptions}
                            </select>
                        </div>

                        <div className="right">
                            <button className='clearButton' type='button' onClick={this.clearStorage}>Clear LocalStorage</button>
                            <button>Manage Teams</button>
                        </div>
                    </div>

                    <div className="team-view-container">
                        <TeamView currTeamId={this.context.flux.teamsStore.getCurrentTeam().id} />
                    </div>
                </div>
            );
        }
    });

});