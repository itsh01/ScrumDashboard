define(
    [
        'lodash',
        'eventemitter2',
        'baseFlux',
        './actions/cardsActions',
        './actions/membersActions',
        './actions/teamsActions',
        './stores/cardsStore',
        './stores/membersStore',
        './stores/teamsStore',
        './stores/planningStore'
    ],
    function (_, EventEmitter, baseFlux, CardsActions, MembersActions, TeamsActions,
              CardsStore, MembersStore, TeamsStore, planningStore) {
        'use strict';

        var dispatcher = new baseFlux.Dispatcher();

        function Flux() {
            
            this.eventEmitter = new EventEmitter();
            this.cardsActions = new CardsActions(dispatcher);
            this.membersActions = new MembersActions(dispatcher);
            this.teamsActions = new TeamsActions(dispatcher);
            this.cardsStore = new CardsStore(dispatcher, this.eventEmitter);
            this.membersStore = new MembersStore(dispatcher, this.eventEmitter);
            this.teamsStore = new TeamsStore(dispatcher, this.eventEmitter, this.cardsStore.getUserCards);
            this.planningStore = new planningStore(dispatcher);
        }

        return Flux;
    });