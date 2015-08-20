//define([
//        'React',
//        'components/card-edit/CardEditCreate'
//    ],
//    function (React, CardEditCreate) {
//        'use strict';
//
//        function initComponent(props) {
//            return React.addons.TestUtils.renderIntoDocument(
//                React.createElement(
//                    CardEditCreate,
//                    props
//                )
//            );
//        }
//
//        describe('CardEditCreate', function () {
//
//            beforeEach(function () {
//                localStorage.clear();
//            });
//
//            describe('empty card tests', function () {
//                var comp;
//                var mockCard = {
//                        name: 'New Card',
//                        description: 'Write A Short Description',
//                        score: 1};
//                beforeEach(function () {
//                    comp = initComponent({card: mockCard, isCreating: true});
//                });
//
//                it('should be creating card if there is no current card in planningStore', function () {
//                    expect(comp.isCreating()).toBe(true);
//                });
//
//            });
//
//            describe('edit card sanity tests', function () {
//                var mockCard, comp, mockTeams;
//                beforeEach(function () {
//                    mockCard = {
//                        id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
//                        name: 'card 1',
//                        description: 'description',
//                        score: 1
//                    };
//                    mockTeams = [{id: '1', value: '1'}, {id: '2', value: '2'}];
//                    comp = initComponent({
//                        card: mockCard,
//                        isCreating: false,
//                        allTeams: mockTeams
//                    });
//
//                });
//
//                it('should be editing card if there is current card in planningStore', function () {
//                    expect(comp.isCreating()).toBe(false);
//                });
//
//                it('should have component state synced with given data', function () {
//
//                    expect(comp.state.name).toEqual(mockCard.name);
//                    expect(comp.state.score).toEqual(mockCard.score);
//                    expect(comp.state.description).toEqual(mockCard.description);
//                    expect(comp.state.id).toEqual(mockCard.id);
//                });
//
//                it('should have 2 inputs with value synced with given data', function () {
//                    var rend = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(comp, 'input');
//                    expect(rend[0].props.valueLink.value).toEqual(mockCard.name);
//                    expect(rend[1].props.valueLink.value).toEqual(mockCard.description);
//                });
//
//
//            });
//
//        });
//    }
//);