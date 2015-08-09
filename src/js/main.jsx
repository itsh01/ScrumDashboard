/**
 * Created by Tzabarc on 7/29/15.
 */

requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        React: '../vendor/react-with-addons',
        DragDropMixin: '../vendor/DragDropMixin',
        components: '../js/components',
        mixins: '../js/mixins',
        stores: '../js/stores',
        flux: '../js/Flux'

    },
    shim: {
        lodash: {
            exports: '_'
        },
        React: {
            exports: 'React'
        },
        flux: {
            exports: 'flux'
        }
    }
});

requirejs(['lodash', 'React', 'components/MainContainer', 'flux'],
    function (_, React, MainContainer) {
        'use strict';
        var mountPoint = document.getElementById('main-container');

        window.scrum = React.render(<MainContainer currentTeam={1}/>, mountPoint);
    }
);