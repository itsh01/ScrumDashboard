define(['lodash', 'React', 'components/team/HomeView',
        'constants', 'components/team-management/TeamManagement'],
    function (_, React, HomeView, constants, TeamManagement) {
        'use strict';
        return React.createClass({
            displayName: 'MainView',

            propTypes: {
                currTeam: React.PropTypes.object,
                params: React.PropTypes.object,
                query: React.PropTypes.object
            },

            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any
            },

            onChange: function () {
                this.setState({});
            },

            componentDidMount: function () {
                this.context.newFlux.cardsStore.addChangeListener(this.onChange);
                this.context.newFlux.teamsStore.addChangeListener(this.onChange);
                this.context.newFlux.membersStore.addChangeListener(this.onChange);
            },

            componentWillUnmount: function () {
                this.context.newFlux.cardsStore.removeChangeListener(this.onChange);
                this.context.newFlux.teamsStore.removeChangeListener(this.onChange);
                this.context.newFlux.membersStore.removeChangeListener(this.onChange);
            },

            getInitialState: function () {
                return {
                    view: 'HomeView'
                };
            },

            getTeams: function () {
                return this.context.flux.teamsStore.getAllActiveTeams();
            },

            clearStorage: function () {
                localStorage.clear();
            },

            handleChangeTeam: function (e) {
                this.context.newFlux.teamsActions.changeCurrentTeamId(e.target.value);
                var team2 = this.context.newFlux.teamsStore.getTeamById(e.target.value);
                this.context.newFlux.teamsActions.changeCurrentSprintId(team2.sprints[team2.sprints.length - 1].id);

                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM_ID, e.target.value);
                var team = this.context.flux.teamsStore.getTeamById(e.target.value);
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT_ID, team.sprints[team.sprints.length - 1].id);
            },

            views: {
                HomeView: 'HomeView',
                TeamManagement: 'TeamManagement'
            },

            getViewComponent: function () {
                var allTeams = this.context.flux.teamsStore.getAllActiveTeams();
                var currentTeam = this.context.flux.teamsStore.getCurrentTeam();
                if (this.state.view === 'HomeView') {
                    return (
                        <div className="home-view-container">
                            <HomeView currTeamId={currentTeam.id}/>
                        </div>
                    );
                }
                if (this.state.view === 'TeamManagement') {
                    return (
                        <div>
                            <TeamManagement allTeams={allTeams} currentTeam={currentTeam}/>
                        </div>
                    );
                }
            },

            changeView: function (event) {
                var view = event.target.dataset.view;
                this.setState({
                    view: this.views[view]
                });
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
                                <button className='clearButton' type='button' onClick={this.clearStorage}>Clear
                                    LocalStorage
                                </button>
                                <button data-view={this.views.TeamManagement} onClick={this.changeView}>Manage Teams
                                </button>
                                <button data-view={this.views.HomeView} onClick={this.changeView}>Home</button>
                            </div>
                        </div>

                        {this.getViewComponent()}
                    </div>
                );
            }
        });

    });