define([
        'React',
        'components/sprint/ContainerSize'
    ],
    function (React, ContainerSize) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        function renderHeapCardsContainerSizeElement(props) {
            var heapCardsContainerSizeElement = React.createElement(ContainerSize, props);
            return testUtils.renderIntoDocument(heapCardsContainerSizeElement);
        }

        describe('HeapCardsContainerSize', function () {

            it('should set containerSize to containerSize passed in props', function () {
                var size = 5,
                    comp = renderHeapCardsContainerSizeElement({containerSize: size});
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

    }
);