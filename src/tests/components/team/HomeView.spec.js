define(['React', 'components/team/HomeView', 'stubContext', 'stores/flux'],
    function (React, HomeView, stubContext, Flux) {
        'use strict';

        var reactTestUtils;
        var flux;
        var HomeViewWithContext;

        describe('home view tests', function () {
            describe('home view full state', function () {
                beforeEach(function () {
                    localStorage.clear();
                    reactTestUtils = React.addons.TestUtils;
                    flux = new Flux();
                    spyOn(flux.dispatcher, 'dispatchAction').and.returnValue({});
                    HomeViewWithContext = stubContext(HomeView, {flux: flux});
                });

                it('should check that HomeView did render', function () {
                    var instance = React.createElement(HomeViewWithContext, {});
                    var comp = reactTestUtils.renderIntoDocument(instance);
                    expect(comp).toBeDefined();
                });
                it('should render full tree', function () {
                    var instance = React.createElement(HomeViewWithContext, {});
                    var comp = reactTestUtils.renderIntoDocument(instance);
                    var actualNUmberOfDivs = reactTestUtils.scryRenderedDOMComponentsWithTag(comp, 'div').length;
                    expect(actualNUmberOfDivs).not.toBe(1);
                });

                it('should call handleSprintChange when clicked', function () {
                    var instance = React.createElement(HomeViewWithContext, {});
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
                });

                it('should render to empty state when there are no teams', function () {
                    var instance = React.createElement(HomeViewWithContext, {});
                    var comp = reactTestUtils.renderIntoDocument(instance);
                    var actualNUmberOfDivs = reactTestUtils.scryRenderedDOMComponentsWithTag(comp, 'div').length;
                    expect(actualNUmberOfDivs).toBe(1);
                });

            });

        });

    });