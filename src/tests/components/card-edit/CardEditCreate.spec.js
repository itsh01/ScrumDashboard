define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'flux/flux'
        , 'lodash'
    ],
    function (React, CardEditCreate, stubContext, Flux, _) {
        'use strict';
        var flux;

        function initComponent(compParams) {
            flux = new Flux();
            var CardEditCreateWithContext = stubContext(CardEditCreate, {newFlux: flux});
            var instance = React.createElement(CardEditCreateWithContext, compParams);
            var contextElement = React.addons.TestUtils.renderIntoDocument(instance);
            var result = React.addons.TestUtils.findRenderedComponentWithType(contextElement, CardEditCreate);
            return result;
        }

        describe('CardEditCreate', function () {

            beforeEach(function () {
                localStorage.clear();
            });

            describe('empty card tests', function () {
                var comp;
                beforeEach(function () {
                    comp = initComponent({card: {}, isCreating: true});
                });

                it('should be creating card if there is no current card in planningStore', function () {
                    expect(comp.isCreating()).toBe(true);
                });

                it('should have empty inputs when creating card', function () {
                    var renderedDOM = React.findDOMNode(comp);
                    var inputs = renderedDOM.querySelectorAll('input');
                    _.forEach(inputs, function (input) {
                        expect(input.textContent).toEqual('');
                    });
                });
            });

            describe('add card tests', function () {
                var comp, mockTeams, mockMembers;
                beforeEach(function () {
                    mockTeams = [{id: '1', name: '1'}, {id: '2', name: '2'}];
                    mockMembers = [{id: '5', name: '1'}, {id: '6', name: '2'}];
                    var currSprintMembers = mockMembers;
                    var props = {
                        card: {status: 'unassigned'},
                        isCreating: true,
                        currSprintMembers: currSprintMembers,
                        allTeams: mockTeams,
                        sprintLifeCycle: []
                    };
                    var t = React.createElement(CardEditCreate, props);
                    comp = React.addons.TestUtils.renderIntoDocument(t);
                });

                it('should show assignee iff there is a team', function () {
                    var teamSelect = React.findDOMNode(comp.refs.team);

                    expect(comp.refs.assignee).toBeUndefined();
                    React.addons.TestUtils.Simulate.change(teamSelect, {target: {value: mockTeams[0].id}});
                    expect(comp.state.team).toEqual(mockTeams[0].id);
                    expect(comp.refs.assignee).toBeDefined();
                });
            });

            describe('edit card tests', function () {
                var mockCard, comp, mockTeams;
                beforeEach(function () {
                    mockCard = {
                        id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
                        name: 'card 1',
                        description: 'description',
                        score: 1
                    };
                    /*eslint-disable*/
                    mockTeams = [{id: '1', value: '1'}, {id: '2', value: '2'}];
                    /*eslint-enable*/
                    flux = new Flux();
                    spyOn(flux.planningStore, 'getCurrentCard').and.returnValue(mockCard);
                    spyOn(flux.teamsStore, 'getAllActiveTeams')
                        .and.returnValue(mockTeams);
                    comp = initComponent({
                        card: mockCard,
                        isCreating: false,
                        allTeams: mockTeams
                    });

                });

                it('should be editing card if there is current card in planningStore', function () {
                    expect(comp.isCreating()).toBe(false);
                });

                it('should have component state synced with given data', function () {

                    expect(comp.state.name).toEqual(mockCard.name);
                    expect(comp.state.score).toEqual(mockCard.score);
                    expect(comp.state.description).toEqual(mockCard.description);
                    expect(comp.state.id).toEqual(mockCard.id);
                });

                it('should have 2 inputs with value synced with given data', function () {
                    var rend = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(comp, 'input');
                    expect(rend[0].props.valueLink.value).toEqual(mockCard.name);
                    expect(rend[1].props.valueLink.value).toEqual(mockCard.description);
                });

                it('should set state "team" on selection change', function () {
                    var teamSelect = React.findDOMNode(comp.refs.team);
                    expect(comp.refs.assignee).toBeUndefined();
                    React.addons.TestUtils.Simulate.change(teamSelect, {target: {value: mockTeams[0].id}});
                    expect(comp.state.team).toEqual(mockTeams[0].id);
                    //expect(comp.refs.assignee).toBeDefined();
                });
            });

        });
    }
);