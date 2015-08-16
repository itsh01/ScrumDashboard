define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'stores/refactor/flux'
        , 'lodash'
    ],
    function (React, CardEditCreate, stubContext, Flux, _) {
        'use strict';
        var flux;

        function initComponent(compParams) {
            var CardEditCreateWithContext = stubContext(CardEditCreate, {newFlux: flux});
            var instance = React.createElement(CardEditCreateWithContext, compParams);
            var wrappedEl = React.addons.TestUtils.renderIntoDocument(instance).getWrappedElement();
            return React.addons.TestUtils.renderIntoDocument(wrappedEl);
        }

        describe('CardEditCreate', function () {

            beforeEach(function () {
                localStorage.clear();
            });

            describe('empty card tests', function () {
                var comp;
                beforeEach(function () {
                    flux = new Flux();
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

            //describe('edit card tests', function () {
            //    var mockCard, comp;
            //    beforeEach(function () {
            //        mockCard = {
            //            id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
            //            name: 'card 1',
            //            description: 'description',
            //            score: 1
            //        };
            //        flux = new Flux();
            //        spyOn(flux.planningStore, 'getCurrentCard').and.returnValue(mockCard);
            //        spyOn(flux.teamsStore, 'getAllActiveTeams')
            //            .and.returnValue([
            //                {id: 1, name: 'team1'},
            //                {id: 2, name: 'team2'}
            //            ]);
            //        comp = initComponent({mockCard: mockCard, isCreating: false});
            //
            //    });
            //
            //    it('should be editing card if there is current card in planningStore', function () {
            //        expect(comp.isCreating()).toBe(false);
            //    });
            //
            //    it('should have component state synced with given data', function () {
            //
            //        expect(comp.state.name).toEqual(mockCard.name);
            //        expect(comp.state.score).toEqual(mockCard.score);
            //        expect(comp.state.description).toEqual(mockCard.description);
            //        expect(comp.state.id).toEqual(mockCard.id);
            //    });
            //
            //    it('should have 2 inputs with value synced with given data', function () {
            //        var rend = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(comp, 'input');
            //        expect(rend[0].props.valueLink.value).toEqual(mockCard.name);
            //        expect(rend[1].props.valueLink.value).toEqual(mockCard.description);
            //    });
            //
            //    it('should set state "team" on selection change', function () {
            //        //comp.setState({team:'t'});
            //        //var rend = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(comp, 'select');
            //        //var teamSelect = _.filter(rend, function (select) {
            //        //    return select.props.value === 'team'
            //        //});
            //        //expect(teamSelect.length).toEqual(1);
            //    });
            //});

        });
    }
);