define(['lodash', 'React', 'components/team/TeamComponent'], function (_, React, TeamView) {
    'use strict';

    return React.createClass({
        displayName: 'HomeView',

        propTypes: {
            currTeam: React.PropTypes.object,
            query: React.PropTypes.object
        },

        contextTypes: {
            flux: React.PropTypes.any,
            router: React.PropTypes.func
        },
        getTeams: function () {
            return this.context.flux.teamsStore.getAllTeams();
        },

        handleChangeTeam: function (e) {

            var query = _.clone(this.props.query);
            query.teamId = e.target.value;
            this.context.router.transitionTo('/', null, query);

            //this.setState({currTeamId: e.target.value});
        },

        render: function () {
            var teamsOptions = _.map(this.getTeams(), function (team) {
                return (<option value={team.id} key={team.id}>{team.name}</option>);
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

                        <TeamView currTeamId={this.props.query.teamId || this.getTeams()[0].id}/>
                    </div>
                </div>
            );
        }
    });

});