
define(
    [
        'lodash',
        './cards',
        './members',
        './teams',
        './planning',
        './dispatcher',
        'flux',
        'eventemitter2',
        './refactor/actions/cardsStoreActions',
        './refactor/actions/teamsStoreActions'
    ],
    function (_, Cards, Members, Teams, Planning, Dispatcher, flux, EventEmitter2, cardsActions, teamsActions) {
        'use strict';

        function Flux() {
            var emitter = new EventEmitter2(), newDispatcher = new flux.Dispatcher();
            this.cardsActions = cardsActions(newDispatcher);
            this.teamsActions = teamsActions(newDispatcher);
            this.dispatcher = new Dispatcher();
            this.cardsStore = new Cards(this.dispatcher, newDispatcher, emitter);
            this.membersStore = new Members(this.dispatcher);
            this.planningStore = new Planning(this.dispatcher);
            this.teamsStore = new Teams(this.dispatcher, this.cardsStore.getUserCards, newDispatcher, emitter);

        }

        return Flux;
    });