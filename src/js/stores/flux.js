define(['lodash', './cards', './members', './teams', './dispatcher'], function (_, Cards, Members, Teams, Dispatcher) {

    function Flux() {
        this.cardsStore = new Cards();
        this.membersStore = new Members();
        this.teamsStore= new Teams();
        this.dispatcher = new Dispatcher([this.cardsStore, this.membersStore, this.teamsStore]);
    }

    return Flux;
});