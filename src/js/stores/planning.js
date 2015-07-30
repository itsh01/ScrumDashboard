define(
    [],
    function () {
        'use strict';

        function Planning(dispatcher) {
            //var sprint, cards;
            //
            //function int() {
            //    sprint = {};
            //    cards = [];
            //}
            //
            //function done() {
            //
            //}

            function addCard(card) {
                console.log(card);
            }

            dispatcher.registerAction('PLANNING_ADD_CARD', addCard.bind(this));
        }
        return Planning;
    });