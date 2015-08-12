define([
        'lodash',
        'React',
        'data/cards',
        'components/sprint/HeapCardsContainer',
        'stubContext'
    ],
    function (_, React, cardsData, HeapCardsContainer, stubbedContextHandler) {
        'use strict';

        var testUtils = React.addons.TestUtils,
            stubFlux;

        describe('HeapCardsContainer', function () {
            var props = {cards: cardsData.slice(0, 3)},
                heapContainerReactElement, heapReactElement, heapReactComponent, cardReactElements;

            beforeEach(function () {
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
                var StubbedContextClass = stubbedContextHandler(HeapCardsContainer, {flux: stubFlux});
                heapReactElement = React.createElement(StubbedContextClass, props);
                heapContainerReactElement = testUtils.renderIntoDocument(heapReactElement);

                heapReactComponent = testUtils.findAllInRenderedTree(heapContainerReactElement, function (component) {
                    return (component.getDOMNode().classList.contains('heap-view') && component.state);
                })[0];

                cardReactElements = testUtils.findAllInRenderedTree(heapReactComponent, function (component) {
                    return (component.getDOMNode().classList.contains('card') && component.state);
                });

            });

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

            describe('UI event handlers', function () {

                describe('Closed Heap', function () {
                    it('should open the heap after the first card is clicked', function () {
                        var firstCard = cardReactElements[0];
                        testUtils.Simulate.click(firstCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should open the heap after the last card is clicked', function () {
                        var lastCard = cardReactElements[cardReactElements.length - 1];
                        testUtils.Simulate.click(lastCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should open the heap after a middle card is clicked', function () {
                        var middleCard = cardReactElements[1];
                        testUtils.Simulate.click(middleCard.getDOMNode());
                        expect(heapReactComponent.state.isHeapOpen).toBe(true);
                    });

                    it('should not open description if the card is clicked once', function () {
                        var card = cardReactElements[1];
                        testUtils.Simulate.click(card.getDOMNode());
                        expect(card.state.isDescriptionOpened).toBe(false);
                    });

                });


                describe('Open Heap', function () {

                    beforeEach(function () {
                        testUtils.Simulate.click(cardReactElements[0].getDOMNode()); // open the heap
                    });

                    it('should open description if the card is clicked', function () {
                        var card = cardReactElements[0];
                        testUtils.Simulate.click(card.getDOMNode());
                        expect(card.state.isDescriptionOpened).toBe(true);
                    });

                    it('should open descriptions of two cards if they are clicked', function () {
                        var card1 = cardReactElements[0],
                            card2 = cardReactElements[1];
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
                        var res = _.every(cardReactElements, function (card) {
                            return card.state.isDescriptionOpened === false;
                        });
                        expect(res).toBe(true);
                    });
                });

            });

        });

    }
);