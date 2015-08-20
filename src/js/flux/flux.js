define(
    [
        '../../vendor/lodash',
        'eventemitter2',
        'baseFlux',
        'flux/actions/cardsActions',
        'flux/actions/membersActions',
        'flux/actions/teamsActions',
        'flux/actions/planningActions',
        'stores/cardsStore',
        'stores/membersStore',
        'stores/teamsStore',
        'stores/planningStore',
        '../data/cards',
        '../data/members',
        '../data/teams'
    ],
    function (_, EventEmitter, baseFlux, CardsActions, MembersActions, TeamsActions, PlanningActions,
              CardsStore, MembersStore, TeamsStore, PlanningStore, defaultCardData, defaultMemberData, defaultTeamsData) {
        'use strict';

        var dispatcher = new baseFlux.Dispatcher(),
            eventEmitter = new EventEmitter(),
            waitForTokens = {};

        function Flux(appLink) {

            var basicPars = {
                    dispatcher: dispatcher,
                    eventEmitter: eventEmitter,
                    waitForTokens: waitForTokens
                },
                cardPars = {
                    defaultCardsData: defaultCardData,
                    fireBaseURL: appLink + '/cards'
                },
                membersPars = {
                    defaultMembersData: defaultMemberData,
                    fireBaseURL: appLink + '/members'
                };

            _.assign(cardPars, basicPars);
            _.assign(membersPars, basicPars);

            this.cardsActions = new CardsActions(dispatcher);
            this.cardsStore = new CardsStore(cardPars);

            this.membersActions = new MembersActions(dispatcher);
            this.membersStore = new MembersStore(membersPars);

            this.planningActions = new PlanningActions(dispatcher);
            this.planningStore = new PlanningStore(basicPars);

            var teamPars = {
                defaultTeamData: defaultTeamsData,
                getUserCards: this.cardsStore.getUserCards,
                getLastMemberAdded: this.membersStore.getLastMemberAdded,
                fireBaseURL: appLink + '/teams'
            };

            _.assign(teamPars, basicPars);

            this.teamsActions = new TeamsActions(dispatcher);
            this.teamsStore = new TeamsStore(teamPars);
        }

        return Flux;
    });
