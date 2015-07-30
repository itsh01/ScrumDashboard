define(
    [],
    function () {
        'use strict';

        function Planning(dispatcher) {
            //var sprint, cards;

            this.getBlankCard = function () {
                return {
                    card: {
                        name: '',
                        description: '',
                        status: '',
                        score: 0,
                        team: '',
                        assignee: '',
                        startDate: null,
                        endDate: null
                    }
                };
            };

            //this.init = function int() {
            //    sprint = {};
            //    cards = [];
            //};

            this.done = function done() {

            };

            this.addCard = function addCard(card) {
                console.log(card);
            };

            dispatcher.registerAction('PLANNING_ADD_CARD', this.addCard.bind(this));
        }

        return Planning;
    });