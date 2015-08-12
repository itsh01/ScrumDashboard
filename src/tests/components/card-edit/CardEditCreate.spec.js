define([
        'React',
        'components/card-edit/CardEditCreate',
        'stubContext',
        'stores/flux'
    ],
    function (React, CardEditCreate, stubContext, Flux) {
        'use strict';
        describe('CardEditCreate', function () {
            var flux = new Flux();
            var instance = React.createElement(stubContext(CardEditCreate, {flux: flux}), {});
            React.addons.TestUtils.renderIntoDocument(instance);
        });
    }
);