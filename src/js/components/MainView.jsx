define(['lodash',
        'React',

        'constants',

        'components/team/BoardView',
        'components/team-management/TeamManagement',
        'components/pop-up/Basic',
        'components/card-edit/CardEditCreate',

        '../flux/flux',
        'Firebase',
        '../data/defaultData'],

    function (_,
              React,
              constants,
              BoardView,
              TeamManagement,
              Popup,
              CardEditCreate,
              Flux,
              Firebase,
              defaultData) {

        'use strict';
        var mainFirebaseRef = new Firebase('https://scrum-dashboard-1.firebaseio.com');
        return React.createClass({
            displayName: 'MainView',

            childContextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {
                this.flux = new Flux();
                return {
                    view: 'BoardView'
                };
            },

            getChildContext: function () {
                return {
                    flux: this.flux
                };
            },

            componentDidMount: function () {
                this.flux.cardsStore.addChangeListener(this._onChange);
                this.flux.teamsStore.addChangeListener(this._onChange);
                this.flux.membersStore.addChangeListener(this._onChange);
                this.flux.planningStore.addChangeListener(this._onChange);
            },

            componentWillUnmount: function () {
                this.flux.cardsStore.removeChangeListener(this._onChange);
                this.flux.teamsStore.removeChangeListener(this._onChange);
                this.flux.membersStore.removeChangeListener(this._onChange);
                this.flux.planningStore.removeChangeListener(this._onChange);
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

                return this.flux.teamsStore.getAllActiveTeams();
            },

            resetFirebaseToDefault: function () {
                mainFirebaseRef.set(defaultData);
            },

            handleChangeTeam: function (e) {
                this.flux.teamsActions.changeCurrentTeamId(e.target.value);
                var team = this.flux.teamsStore.getTeamById(e.target.value);
                this.flux.teamsActions.setCurrentSprintId(team.sprints[team.sprints.length - 1].id);
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
                if (this.flux.teamsStore.getCurrentTeam().id === teamId) {
                    return (<option value={teamId} key={teamId} selected>{teamName}</option>);
                }
                return (<option value={teamId} key={teamId}>{teamName}</option>);
            },

            popUpFactory: function () {
                if (!this.flux.planningStore.getIsAddingOrEditingCard()) {
                    return null;
                }

                var isCreating = false;
                var currCard = this.flux.planningStore.getCurrentCard();
                if (!currCard) {
                    currCard = this.flux.cardsStore.getBlankCard();
                    isCreating = true;
                    currCard.team = this.flux.teamsStore.getCurrentTeam().id;
                }

                var currSprint = this.flux.teamsStore.getCurrentSprint();
                var currSprintMembers = currSprint.members;
                currSprintMembers = this.flux.membersStore.getMembersByIdList(currSprintMembers);
                var allTeams = this.flux.teamsStore.getAllActiveTeams();
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
                                    <button className='clearButton' type='button' onClick={this.resetFirebaseToDefault}>Reset Firebase
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