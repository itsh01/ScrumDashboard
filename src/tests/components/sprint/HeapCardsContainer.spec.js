define([
        'lodash',
        'React',
        'components/sprint/HeapCardsContainer',
        'stubContext'
    ],
    function (_, React, HeapCardsContainer, stubbedContextHandler) {
        'use strict';

        var testUtils = React.addons.TestUtils,
            transformValue = 'translate(1rem, 1rem)',
            transformStyle = {transform: transformValue},
            cards = [
                {
                    id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
                    name: 'card 1',
                    description: 'description',
                    score: 1
                },
                {
                    id: '90eed4aa-40fe-496e-999a-54a436d66427',
                    name: 'card 2',
                    description: 'description',
                    score: 2
                },
                {
                    id: 'eaf1abfe-639f-4a8b-8e02-add0acc9833a',
                    name: 'card 3',
                    description: 'description',
                    score: 3
                }
            ],
            stubFlux = {
                teamsStore: {
                    getCurrentSprint: function () {
                        return {state: 2};
                    }
                },
                dispatcher: {
                    dispatchAction: function () {
                    }
                }
            };

        describe('HeapCardsContainer', function () {
            var props = {cards: cards},
                heapContainerReactElement, heapReactElement, heapReactComponent, cardReactComponents;

            beforeEach(function () {
                var StubbedContextClass = stubbedContextHandler(HeapCardsContainer, {flux: stubFlux});
                heapReactElement = React.createElement(StubbedContextClass, props);
                heapContainerReactElement = testUtils.renderIntoDocument(heapReactElement);

                heapReactComponent = testUtils.findAllInRenderedTree(heapContainerReactElement, function (component) {
                    return (component.getDOMNode().classList.contains('heap-view') && component.state);
                })[0];

                cardReactComponents = testUtils.findAllInRenderedTree(heapContainerReactElement, function (component) {
                    return (component.getDOMNode().classList.contains('card') && component.state);
                });

                spyOn(heapReactComponent, 'getOpenHeapCardStyle').and.returnValue(transformStyle);

            });

            /*
            describe('HeapCardsContainerSize', function () {

                it('should set containerSize to containerSize passed in props', function () {
                    var size = 5,
                        comp = testUtils.find
                    expect(comp.props.containerSize).toBe(size);
                });

                it('should call the function passed in props after it is clicked', function (done) {
                    function fakeHandler() {
                        done();
                    }
                    var comp = renderHeapCardsContainerSizeElement({clickHandler: fakeHandler});
                    testUtils.Simulate.click(comp.getDOMNode());
                });

            });
            */

            describe('props', function () {

                it('should not throw an error when receiving an empty array in props', function () {
                    function func() {
                        testUtils.renderIntoDocument(React.createElement(HeapCardsContainer, {cards: []}));
                    }
                    expect(func).not.toThrow();
                });

            });

            describe('Initial State', function () {

                it('should set the initial value of the isHeapOpen state to false', function () {
                    expect(heapReactComponent.state.isHeapOpen).toBe(false);
                });

                it('should set the initial value of the openCardId state to null', function () {
                    expect(heapReactComponent.state.openCardId).toBe(null);
                });

            });

            describe('UI Event Handlers', function () {

                describe('Closed Heap', function () {

                    it('should not set openCardId after a card is clicked', function () {
                        var card = cardReactComponents[0];
                        testUtils.Simulate.click(card.getDOMNode());
                        expect(heapReactComponent.state.openCardId).toBe(null);
                    });

                    it('should open the heap after the first card is clicked', function () {
                        var firstCard = cardReactComponents[0];
                        testUtils.Simulate.click(firstCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should open the heap after the last card is clicked', function () {
                        var lastCard = cardReactComponents[cardReactComponents.length - 1];
                        testUtils.Simulate.click(lastCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should open the heap after a middle card is clicked', function () {
                        var middleCard = cardReactComponents[1];
                        testUtils.Simulate.click(middleCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should not open description if the card is clicked once', function () {
                        var card = cardReactComponents[1];
                        testUtils.Simulate.click(card.getDOMNode());
                        expect(card.state.isDescriptionOpened).toBe(false);
                    });

                    it('should not transform cards', function () {
                        var cardWrappers = testUtils.findAllInRenderedTree(heapContainerReactElement, function (component) {
                                return component.getDOMNode().classList.contains('sprint-card-wrapper');
                            }),
                            notTransformed = _.every(cardWrappers, function (card) {
                                return _.isEmpty(card.getDOMNode().style.transform);
                            });
                        expect(notTransformed).toBe(true);
                    });

                });


                describe('Open Heap', function () {

                    beforeEach(function () {
                        testUtils.Simulate.click(cardReactComponents[0].getDOMNode()); // open the heap
                    });

                    it('should open description after the card is clicked', function () {
                        var card = cardReactComponents[0];
                        testUtils.Simulate.click(card.getDOMNode());
                        expect(card.state.isDescriptionOpened).toBe(true);
                    });

                    it('should set openCardId to the id of the last clicked card', function () {
                        var card1 = cardReactComponents[0], card2 = cardReactComponents[1];
                        testUtils.Simulate.click(card1.getDOMNode());
                        testUtils.Simulate.click(card2.getDOMNode());
                        expect(heapReactComponent.state.openCardId).toBe(cards[1].id);
                    });

                    it('should open descriptions of two cards after they are clicked', function () {
                        var card1 = cardReactComponents[0],
                            card2 = cardReactComponents[1];
                        testUtils.Simulate.click(card1.getDOMNode());
                        testUtils.Simulate.click(card2.getDOMNode());
                        expect(card1.state.isDescriptionOpened).toBe(true);
                        expect(card2.state.isDescriptionOpened).toBe(true);
                    });

                    it('should close the heap after the close button is clicked', function () {
                        var closeBtn = testUtils.findRenderedDOMComponentWithClass(heapReactComponent, 'sprint-cards-container-close-heap-btn');
                        testUtils.Simulate.click(closeBtn.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(false);
                    });

                    it('should close all the cards after the close button is clicked', function () {
                        var closeBtn = testUtils.findRenderedDOMComponentWithClass(heapReactComponent, 'sprint-cards-container-close-heap-btn');
                        testUtils.Simulate.click(closeBtn.getDOMNode());
                        var res = _.every(cardReactComponents, function (card) {
                            return card.state.isDescriptionOpened === false;
                        });
                        expect(res).toBe(true);
                    });

                    it('should transform cards', function () {
                        var cardWrappers = testUtils.findAllInRenderedTree(heapContainerReactElement, function (component) {
                            return component.getDOMNode().classList.contains('sprint-card-wrapper');
                        });
                        _.forEach(cardWrappers, function (cardWrapper) {
                            expect(cardWrapper.getDOMNode().style.transform).toEqual(transformValue);
                        });

                    });
                });

            });

        });

    }
);