
define(
    [
        'lodash',
        './cards',
        './members',
        './teams',
        './planning',
        './dispatcher',
        '../data/cards',
        '../data/members',
        '../data/teams'
    ],
    function (_, Cards, Members, Teams, Planning, Dispatcher, cardsData, membersData, teamsData) {
        'use strict';

        function Flux() {
            this.dispatcher = new Dispatcher();
            this.cardsStore = new Cards(this.dispatcher, cardsData);
            this.membersStore = new Members(this.dispatcher, membersData);
            this.planningStore = new Planning(this.dispatcher);
            this.teamsStore = new Teams(this.dispatcher, teamsData, this.cardsStore.getUserCards);

        }

        return Flux;
    });