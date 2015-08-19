define(
    [
        '../../vendor/lodash',
        'eventemitter2',
        'baseFlux',
        'flux/actions/cardsActions',
        'flux/actions/membersActions',
        'flux/actions/teamsActions',
        'flux/actions/planningActions',
        'stores/cardsStore',
        'stores/membersStore',
        'stores/teamsStore',
        'stores/planningStore',
        '../data/cards',
        '../data/members',
        '../data/teams'
    ],
    function (_, EventEmitter, baseFlux, CardsActions, MembersActions, TeamsActions, PlanningActions,
              CardsStore, MembersStore, TeamsStore, PlanningStore, defaultCardData, defaultMemberData, defaultTeamsData) {
        'use strict';

        var dispatcher = new baseFlux.Dispatcher(),
            eventEmitter = new EventEmitter(),
            waitForTokens = {};

        function Flux() {

            var appLink = 'https://scrum-dashboard-1.firebaseio.com/';

            this.cardsActions = new CardsActions(dispatcher);

            var cardPars = {
                dispatcher: dispatcher,
                eventEmitter: eventEmitter,
                waitForTokens: waitForTokens,
                defaultCardsData: defaultCardData,
                fireBaseURL: appLink + 'cards'
            };

            //this.cardsStore = new CardsStore(dispatcher, eventEmitter, waitForTokens, defaultCardData);
            this.cardsStore = new CardsStore(cardPars);

            this.membersStore = new MembersStore(dispatcher, eventEmitter, waitForTokens, defaultMemberData);
            this.membersActions = new MembersActions(dispatcher);

            this.teamsActions = new TeamsActions(dispatcher);

            var teamPars = {
                dispatcher: dispatcher,
                eventEmitter: eventEmitter,
                waitForTokens: waitForTokens,
                defaultTeamData: defaultTeamsData,
                getUserCards: this.cardsStore.getUserCards,
                getLastMemberAdded: this.membersStore.getLastMemberAdded,
                fireBaseURL: appLink + 'teams'
            };

            this.teamsStore = new TeamsStore(teamPars);

            this.planningActions = new PlanningActions(dispatcher);
            this.planningStore = new PlanningStore(dispatcher, eventEmitter, waitForTokens);
        }

        return Flux;
    });
