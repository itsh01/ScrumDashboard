define(
    [
        'lodash',
        'eventemitter2',
        'baseFlux',
        './actions/cardsStoreActions',
        './actions/membersStoreActions',
        './actions/teamsStoreActions',
        './stores/cards',
        './stores/members',
        './stores/teams'
    ],
    function (_, EventEmitter, baseFlux, CardsActions, MembersActions, TeamsActions,
              CardsStore, MembersStore, TeamsStore) {
        'use strict';

        var dispatcher = new baseFlux.Dispatcher();

        function Flux() {
            this.eventEmitter = new EventEmitter();
            this.cardsActions = new CardsActions(dispatcher);
            this.membersActions = new MembersActions(dispatcher);
            this.teamsActions = new TeamsActions(dispatcher);
            this.cardsStore = new CardsStore(dispatcher, this.eventEmitter);
            //this.membersStore = new MembersStore(dispatcher, this.eventEmitter);
            //this.teamsStore = new TeamsStore(dispatcher, this.eventEmitter, this.cardsStore.getUserCards);
        }

        return Flux;
    });