/**
 * Created by Tzabarc on 7/29/15.
 */

requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        React: '../vendor/react-with-addons',
        DragDropMixin: '../vendor/DragDropMixin',
        DatePicker: '../vendor/DatePicker',
        eventemitter2: '../vendor/eventemitter2',
        components: '../js/components',
        mixins: '../js/mixins',
        general: '../js/general',
        stores: '../js/stores',
        flux: '../js/stores/refactor/Flux',


        // DatePicker dependencies

        tether: '../vendor/tether',
        moment: '../vendor/moment',
        'react-onclickoutside': '../vendor/react-onclickoutside'
    },
    map: {
        '*': {
            react: 'React'
        }

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
        },
        eventemitter2: {
            exports: 'eventemitter2'
        }
    }
});

requirejs(['lodash', 'React', 'components/MainContainer', 'flux', 'eventemitter2'],
    function (_, React, MainContainer) {
        'use strict';
        var mountPoint = document.getElementById('main-container');

        window.scrum = React.render(<MainContainer currentTeam={1}/>, mountPoint);
    }
);