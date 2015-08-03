define(
    [
        'lodash',
        './cards',
        './members',
        './teams',
        './planning',
        './dispatcher',
        '../../../tests/store/test'
    ],
    function (_, Cards, Members, Teams, Planning, Dispatcher) {
        'use strict';

        function Flux() {
            this.dispatcher = new Dispatcher();
            this.cardsStore = new Cards(this.dispatcher);
            this.membersStore = new Members(this.dispatcher);
            this.planningStore = new Planning(this.dispatcher);
            this.teamsStore = new Teams(this.dispatcher, this.cardsStore.getUserCards);

            //Test.run();
        }

        return Flux;
    });