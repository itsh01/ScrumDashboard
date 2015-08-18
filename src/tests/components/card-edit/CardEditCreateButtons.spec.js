define(
    [
        'React',
        'stubContext',
        'components/card-edit/CardEditCreateButtons'

    ],
    function (React, stubContext, CardEditCreateButtons) {
        'use strict';

        var MOCK_CARDS_ACTIONS, MOCK_PLANNING_ACTIONS, MOCK_PROPS_EDITING, MOCK_PROPS_ADDING;

        function initializeMocks() {
            MOCK_CARDS_ACTIONS = jasmine.createSpyObj('cardsActions', ['addCard', 'updateCard']);
            MOCK_PLANNING_ACTIONS = jasmine.createSpyObj('planningActions', ['planningDoneAddingCard']);
            MOCK_PROPS_EDITING = {card: {assignee: '1', status: '1'}, isCreating: false};
            MOCK_PROPS_ADDING = {card: {assignee: '1', status: '1'}, isCreating: true};
        }


        function initComp(mockFlux, mockProps) {
            var stubDeclaration = stubContext(CardEditCreateButtons, {flux: mockFlux});
            var stubElement = React.createElement(stubDeclaration, mockProps);
            var stubRendered = React.addons.TestUtils.renderIntoDocument(stubElement);
            var result = React.addons.TestUtils.findRenderedComponentWithType(stubRendered, CardEditCreateButtons);
            return result;
        }

        describe('CardEditCreateButtons', function () {
            var comp;

            beforeEach(initializeMocks);

            describe('sanity', function () {
                beforeEach(function () {
                    comp = initComp(
                        {
                            cardsActions: MOCK_CARDS_ACTIONS,
                            planningActions: MOCK_PLANNING_ACTIONS
                        }, MOCK_PROPS_EDITING);
                });

                it('should have mock flux up and running', function () {
                    expect(comp.context.flux.cardsActions).toBeDefined();
                });
            });

            describe('editing card onSave', function () {

                beforeEach(function () {
                    comp = initComp(
                        {
                            cardsActions: MOCK_CARDS_ACTIONS,
                            planningActions: MOCK_PLANNING_ACTIONS
                        }, MOCK_PROPS_EDITING);

                    var saveBtn = React.addons.TestUtils.findRenderedDOMComponentWithClass(comp, 'card-edit-btn-save');
                    React.addons.TestUtils.Simulate.click(saveBtn);
                });

                it('should call updateCard action when editing', function () {
                    expect(MOCK_CARDS_ACTIONS.updateCard).toHaveBeenCalled();
                });

                it('should\'t call addCard action when editing', function () {
                    expect(MOCK_CARDS_ACTIONS.addCard).not.toHaveBeenCalled();
                });
            });

            describe('adding card onSave', function () {

                beforeEach(function () {
                    comp = initComp(
                        {
                            cardsActions: MOCK_CARDS_ACTIONS,
                            planningActions: MOCK_PLANNING_ACTIONS
                        }, MOCK_PROPS_ADDING);
                    var saveBtn = React.addons.TestUtils.findRenderedDOMComponentWithClass(comp, 'card-edit-btn-save');
                    React.addons.TestUtils.Simulate.click(saveBtn);
                });

                it('should call addCard action when creating', function () {
                    expect(MOCK_CARDS_ACTIONS.addCard).toHaveBeenCalled();
                });


                it('should\'t call updateCard action when editing', function () {
                    expect(MOCK_CARDS_ACTIONS.updateCard).not.toHaveBeenCalled();
                });
            });

        });
    });