define(['lodash', 'React', 'ReactRouter', 'components/team/TeamComponent'], function (_, React, Router, TeamView) {
    'use strict';
    var Link = Router.Link;
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

        mixins: [Router.Navigation],

        getTeams: function () {
            return this.context.flux.teamsStore.getAllTeams();
        },

        handleChangeTeam: function (e) {
            this.transitionTo('team', {id: e.target.value}, this.props.query);
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
                            <select onChange={this.handleChangeTeam}>
                                <option selected disabled>-</option>
                                {teamsOptions}
                            </select>
                        </div>

                        <div className="right">
                            <button><Link to='team-management'>Manage Teams</Link></button>
                        </div>
                    </div>

                    <div className="team-view-container">
                        <TeamView currTeamId={this.props.params.id || this.getTeams()[0].id} />
                    </div>
                </div>
            );
        }
    });

});