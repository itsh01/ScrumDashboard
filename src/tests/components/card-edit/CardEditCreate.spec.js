define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'stores/flux'
    ],
    function (React, CardEditCreate, stubContext, Flux) {
        'use strict';
        var instance, instanceWithContext, renderedInstance;

        describe('CardEditCreate', function () {
            instanceWithContext = stubContext(CardEditCreate, {flux: new Flux()});
            instance = React.createElement(instanceWithContext, {});


            renderedInstance = React.addons.TestUtils.renderIntoDocument(instance);


        });

        it('should be creating card if there is no current card in planningStore', function () {
            expect(React.addons.TestUtils.isCompositeComponent(renderedInstance)).toBeTruthy();
        });
    }
);