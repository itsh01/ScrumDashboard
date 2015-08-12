define(['React', 'components/team/HomeView', 'stubContext', 'stores/flux'],
    function (React, HomeView, stubContext, Flux) {
        'use strict';

        var reactTestUtils;
        var flux;
        var HomeViewWithContext;
        var instance;
        var comp;

        describe('home view tests', function () {
            describe('home view full state', function () {
                beforeEach(function () {
                    localStorage.clear();
                    reactTestUtils = React.addons.TestUtils;
                    flux = new Flux();
                    spyOn(flux.dispatcher, 'dispatchAction').and.returnValue({});
                    HomeViewWithContext = stubContext(HomeView, {flux: flux});
                    instance = React.createElement(HomeViewWithContext, {});
                    comp = reactTestUtils.renderIntoDocument(instance);
                });

                it('should check that HomeView did render', function () {
                    expect(comp).toBeDefined();
                });

                it('should render full tree', function () {
                    var actualNUmberOfDivs = reactTestUtils.scryRenderedDOMComponentsWithTag(comp, 'div').length;
                    expect(actualNUmberOfDivs).not.toBe(1);
                });

                it('should call handleSprintChange when clicked', function () {
                    var wrapperEl = reactTestUtils.renderIntoDocument(instance).getWrappedElement();
                    var homeViewComp = reactTestUtils.renderIntoDocument(wrapperEl);
                    var arrows = reactTestUtils.scryRenderedDOMComponentsWithClass(homeViewComp, 'arrow');
                    spyOn(homeViewComp, 'handleSprintChange');
                    reactTestUtils.Simulate.click(arrows[1].getDOMNode());
                    expect(flux.dispatcher.dispatchAction).toHaveBeenCalled();
                });


            });
            describe('home view empty state', function () {
                beforeEach(function () {
                    localStorage.clear();
                    reactTestUtils = React.addons.TestUtils;
                    flux = new Flux();
                    spyOn(flux.teamsStore, 'getCurrentTeam').and.returnValue({});
                    HomeViewWithContext = stubContext(HomeView, {flux: flux});
                    instance = React.createElement(HomeViewWithContext, {});
                    comp = reactTestUtils.renderIntoDocument(instance);
                });

                it('should render to empty state when there are no teams', function () {
                    var actualNUmberOfDivs = reactTestUtils.scryRenderedDOMComponentsWithTag(comp, 'div').length;
                    expect(actualNUmberOfDivs).toBe(1);
                });

            });

            describe('getSprintButton', function () {
                beforeEach(function () {

                });

                it('should return a "plan new sprint button"', function () {

                });

                it('should call planNewSprint on click', function () {

                });
            });

        });

    });