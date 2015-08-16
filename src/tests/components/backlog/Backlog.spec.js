define([
        'react',
        'stubContext',
        'components/backlog/Backlog',
        'components/backlog/CardsList',
        'stores/refactor/flux'
    ],
    function (React, stubContext, Backlog, CardsList, Flux) {
        'use strict';
        describe('backlog:', function () {


            describe('component Backlog', function () {
                var BacklogWithContext;
                var backlogComp;

                beforeEach(function () {
                    window.localStorage.clear();

                    BacklogWithContext = stubContext(Backlog, {newFlux: new Flux()});
                    var instance = React.createElement(BacklogWithContext, {teamId: '2d2d8f82-0b6a-404a-9c08-929cfe3de079'});
                    var wrappedElement = React.addons.TestUtils.renderIntoDocument(instance).getWrappedElement();
                    backlogComp = React.addons.TestUtils.renderIntoDocument(wrappedElement);

                });

                it('should be defined', function () {
                    expect(backlogComp).toBeDefined();
                });

                it('should have 2 cardlists components', function () {
                    var teamCardList = backlogComp.refs.teamCardList;
                    var companyCardList = backlogComp.refs.teamCardList;

                    expect(teamCardList).toBeDefined();
                    expect(companyCardList).toBeDefined();
                });

            });

            describe('component CardsList', function () {
                var CardsListWithContext;
                var CardsListComp;
                var mockList = [];

                beforeEach(function () {
                    window.localStorage.clear();

                    CardsListWithContext = stubContext(CardsList, {newFlux: new Flux()});
                    var instance = React.createElement(CardsListWithContext, {cardsList: mockList});
                    var wrappedElement = React.addons.TestUtils.renderIntoDocument(instance).getWrappedElement();
                    CardsListComp = React.addons.TestUtils.renderIntoDocument(wrappedElement);

                });

                it('should be defined', function () {
                    expect(CardsListComp).toBeDefined();
                });

                it('should call addNewCard() when click on plus (empty state) img', function () {
                    spyOn(CardsListComp.context.newFlux.planningActions, 'planningAddCard').and.stub();

                    var node = React.findDOMNode(CardsListComp.refs.plusAddButton);
                    React.addons.TestUtils.Simulate.click(node);

                    expect(CardsListComp.context.newFlux.planningActions.planningAddCard).toHaveBeenCalled();
                });


            });

        });

    }
);