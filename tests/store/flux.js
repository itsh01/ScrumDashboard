define(
    [
        '../../src/vendor/lodash',
        '../../src/js/stores/cards',
        '../../src/js/stores/members',
        '../../src/js/stores/teams',
        '../../src/js/stores/dispatcher'
    ],
    function (_,
              Cards,
              Members,
              Teams,
              Dispatcher) {
        'use strict';

        function Flux() {
            this.dispatcher = new Dispatcher();
            this.cardsStore = new Cards(this.dispatcher);
            this.membersStore = new Members(this.dispatcher);
            this.teamsStore = new Teams(this.dispatcher, this.cardsStore.getUserCards);
        }

        return Flux;
    });
