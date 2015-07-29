define(['lodash', './cards', './members', './teams', './dispatcher'], function (_, Cards, Members, Teams, Dispatcher) {
    'use strict';

    function Flux() {
        this.dispatcher = new Dispatcher();
        this.cardsStore = new Cards(this.dispatcher);
        this.membersStore = new Members(this.dispatcher);
        this.teamsStore = new Teams(this.dispatcher);
    }

    return Flux;
});