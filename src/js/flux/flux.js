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
            this.cardsActions = new CardsActions(dispatcher);
            this.cardsStore = new CardsStore(dispatcher, eventEmitter, waitForTokens, defaultCardData);

            this.membersStore = new MembersStore(dispatcher, eventEmitter, waitForTokens, defaultMemberData);
            this.membersActions = new MembersActions(dispatcher);

            this.teamsActions = new TeamsActions(dispatcher);
            this.teamsStore = new TeamsStore(dispatcher, eventEmitter, waitForTokens, defaultTeamsData, this.cardsStore.getUserCards, this.membersStore.getLastMemberAdded);

            this.planningActions = new PlanningActions(dispatcher);
            this.planningStore = new PlanningStore(dispatcher, eventEmitter, waitForTokens);
        }

        return Flux;
    });
