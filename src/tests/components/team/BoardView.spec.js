define(['React', 'components/team/BoardView', 'stubContext', 'flux/flux'],
    function (React, BoardView, stubContext, Flux) {
        'use strict';

        var reactTestUtils;
        var flux;
        var BoardViewWithContext;
        var instance;
        var comp;

        describe('board view tests', function () {

            describe('board view full state', function () {
                beforeEach(function () {
                    localStorage.clear();
                    reactTestUtils = React.addons.TestUtils;
                    flux = new Flux();
                    BoardViewWithContext = stubContext(BoardView, {flux: flux});
                    instance = React.createElement(BoardViewWithContext, {});
                    comp = reactTestUtils.renderIntoDocument(instance);
                    spyOn(flux.teamsActions, 'changeCurrentSprintId').and.returnValue({});
                });

                it('should check that BoardView did render', function () {
                    expect(comp).toBeDefined();
                });

                it('should render full tree', function () {
                    var actualNUmberOfDivs = reactTestUtils.scryRenderedDOMComponentsWithTag(comp, 'div').length;
                    expect(actualNUmberOfDivs).not.toBe(1);
                });

                it('should call handleSprintChange when clicked', function () {
                    var wrapperEl = reactTestUtils.renderIntoDocument(instance).getWrappedElement();
                    var boardViewComp = reactTestUtils.renderIntoDocument(wrapperEl);
                    var arrows = reactTestUtils.scryRenderedDOMComponentsWithClass(boardViewComp, 'arrow');
                    spyOn(boardViewComp, 'handleSprintChange');
                    reactTestUtils.Simulate.click(arrows[1].getDOMNode());
                    expect(flux.teamsActions.changeCurrentSprintId).toHaveBeenCalled();
                });


            });
            describe('board view empty state', function () {
                beforeEach(function () {
                    localStorage.clear();
                    reactTestUtils = React.addons.TestUtils;
                    flux = new Flux();
                    spyOn(flux.teamsStore, 'getCurrentTeam').and.returnValue({});
                    BoardViewWithContext = stubContext(BoardView, {flux: flux});
                    instance = React.createElement(BoardViewWithContext, {});
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