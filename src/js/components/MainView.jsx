define(['lodash', 'React', 'components/team/BoardView',
        'constants', 'components/team-management/TeamManagement'],
    function (_, React, BoardView, constants, TeamManagement) {
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

            getInitialState: function () {
                return {
                    view: 'BoardView'
                };
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

            onChange: function () {
                this.setState({});
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
                BoardView: 'BoardView',
                TeamManagement: 'TeamManagement'
            },

            getViewComponent: function () {
                if (this.state.view === 'BoardView') {
                    return (
                        <div className="home-view-container">
                            <BoardView />
                        </div>
                    );
                }
                if (this.state.view === 'TeamManagement') {
                    return (
                        <div>
                            <TeamManagement />
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

            getOption: function (teamId, teamName) {
                if (this.context.flux.teamsStore.getCurrentTeam().id === teamId) {
                    return (<option value={teamId} key={teamId} selected>{teamName}</option>);
                }
                return (<option value={teamId} key={teamId}>{teamName}</option>);
            },

            render: function () {
                var teamsOptions = _.map(this.getTeams(), function (team) {
                    return this.getOption(team.id, team.name);
                }.bind(this));
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
                                <button data-view={this.views.BoardView} onClick={this.changeView}>Home</button>
                            </div>
                        </div>

                        {this.getViewComponent()}
                    </div>
                );
            }
        });

    });