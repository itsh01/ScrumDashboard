define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'stores/flux',
        'lodash'
    ],
    function (React, CardEditCreate, stubContext, Flux, _) {
        'use strict';
        var instance, instanceWithContext, renderedInstance;


        describe('CardEditCreate', function () {
            instanceWithContext = stubContext(CardEditCreate, {flux: new Flux()});
            instance = React.createElement(instanceWithContext, {});
            renderedInstance = React.addons.TestUtils.renderIntoDocument(instance);
            var comp;

            beforeEach(function () {
                localStorage.clear();
                var flux = new Flux();
                var CardEditCreateWithContext = stubContext(CardEditCreate, {flux: flux});
                var instance = React.createElement(CardEditCreateWithContext, {});
                var wrappedEl = React.addons.TestUtils.renderIntoDocument(instance).getWrappedElement();
                comp = React.addons.TestUtils.renderIntoDocument(wrappedEl);

            });

            describe('empty card tests', function () {
                it('should be creating card if there is no current card in planningStore', function () {
                    expect(comp.isCreating()).toBe(true);
                });
            });

        });
    }
);