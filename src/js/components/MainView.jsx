define(['lodash',
        'React',

        'constants',

        'components/team/BoardView',
        'components/team-management/TeamManagement',
        'components/pop-up/Basic',
        'components/card-edit/CardEditCreate',

        'stores/refactor/flux'],

    function (_,
              React,
              constants,
              BoardView,
              TeamManagement,
              Popup,
              CardEditCreate,
              NewFlux) {

        'use strict';

        return React.createClass({
            displayName: 'MainView',

            childContextTypes: {
                newFlux: React.PropTypes.any
            },

            getInitialState: function () {
                this.newFlux = new NewFlux();
                return {
                    view: 'BoardView'
                };
            },

            getChildContext: function () {
                return {
                    newFlux: this.newFlux
                };
            },

            componentDidMount: function () {
                this.newFlux.cardsStore.addChangeListener(this._onChange);
                this.newFlux.teamsStore.addChangeListener(this._onChange);
                this.newFlux.membersStore.addChangeListener(this._onChange);
                this.newFlux.planningStore.addChangeListener(this._onChange);
            },

            componentWillUnmount: function () {
                this.newFlux.cardsStore.removeChangeListener(this._onChange);
                this.newFlux.teamsStore.removeChangeListener(this._onChange);
                this.newFlux.membersStore.removeChangeListener(this._onChange);
                this.newFlux.planningStore.removeChangeListener(this._onChange);
            },

            views: {
                BoardView: 'BoardView',
                TeamManagement: 'TeamManagement'
            },

            _onChange: function () {
                this.setState({
                    //view: 'HomeView'
                });
            },

            getTeams: function () {
                //return this.context.flux.teamsStore.getAllActiveTeams();

                return this.newFlux.teamsStore.getAllActiveTeams();
            },

            clearStorage: function () {
                localStorage.clear();
            },

            handleChangeTeam: function (e) {
                this.newFlux.teamsActions.changeCurrentTeamId(e.target.value);
                var team = this.newFlux.teamsStore.getTeamById(e.target.value);
                this.newFlux.teamsActions.changeCurrentSprintId(team.sprints[team.sprints.length - 1].id);
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
                //if (this.context.flux.teamsStore.getCurrentTeam().id === teamId) {
                if (this.newFlux.teamsStore.getCurrentTeam().id === teamId) {
                    return (<option value={teamId} key={teamId} selected>{teamName}</option>);
                }
                return (<option value={teamId} key={teamId}>{teamName}</option>);
            },

            popUpFactory: function () {
                if (!this.newFlux.planningStore.getIsAddingOrEditingCard()) {
                    return null;
                }

                var isCreating = false;
                var currCard = this.newFlux.planningStore.getCurrentCard();
                if (!currCard) {
                    currCard = this.newFlux.cardsStore.getBlankCard();
                    isCreating = true;
                }

                var currSprint = this.newFlux.teamsStore.getCurrentSprint();
                var currSprintMembers = currSprint.members;
                currSprintMembers = this.newFlux.membersStore.getMembersByIdList(currSprintMembers);
                var allTeams = this.newFlux.teamsStore.getAllActiveTeams();
                var sprintLifeCycle = currSprint.cardLifecycle;

                return (
                    <Popup>
                        <CardEditCreate card={currCard} isCreating={isCreating} sprintLifeCycle={sprintLifeCycle}
                                        currSprintMembers={currSprintMembers} allTeams={allTeams}/>
                    </Popup>
                );

            },

            render: function () {
                var teamsOptions = _.map(this.getTeams(), function (team) {
                    return this.getOption(team.id, team.name);
                }.bind(this));
                return (
                    <div>
                        {this.popUpFactory()}

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
                    </div>
                );
            }
        });
    });