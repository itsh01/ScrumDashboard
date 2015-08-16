define(
    [
        'lodash',
        'eventemitter2',
        'baseFlux',
        './actions/cardsActions',
        './actions/membersActions',
        './actions/teamsActions',
        './actions/planningActions',
        './stores/cardsStore',
        './stores/membersStore',
        './stores/teamsStore',
        './stores/planningStore'
    ],
    function (_, EventEmitter, baseFlux, CardsActions, MembersActions, TeamsActions, PlanningActions,
              CardsStore, MembersStore, TeamsStore, planningStore) {
        'use strict';

        var dispatcher = new baseFlux.Dispatcher(),
            eventEmitter = new EventEmitter();

        function Flux() {
            this.cardsActions = new CardsActions(dispatcher);
            this.membersActions = new MembersActions(dispatcher);
            this.teamsActions = new TeamsActions(dispatcher);
            this.planningActions = new PlanningActions(dispatcher);
            this.cardsStore = new CardsStore(dispatcher, eventEmitter);
            this.membersStore = new MembersStore(dispatcher, eventEmitter);
            this.teamsStore = new TeamsStore(dispatcher, eventEmitter, this.cardsStore.getUserCards);
            this.planningStore = new planningStore(dispatcher, eventEmitter);
        }

        return Flux;
    });