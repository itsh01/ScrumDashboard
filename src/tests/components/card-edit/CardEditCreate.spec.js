define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'stores/flux'
        //,'lodash'
    ],
    function (React, CardEditCreate, stubContext, Flux/*, _*/) {
        'use strict';
        var comp;


        describe('CardEditCreate', function () {

            beforeEach(function () {
                localStorage.clear();
                var flux = new Flux();
                var CardEditCreateWithContext = stubContext(CardEditCreate, {newFlux: flux});
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