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
        stores: '../js/flux/stores',
        baseFlux: '../js/flux/baseFlux',
        Firebase: '../vendor/firebase',


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
        baseFlux: {
            exports: 'baseFlux'
        },
        eventemitter2: {
            exports: 'eventemitter2'
        },
        Firebase: {
            exports: 'Firebase'
        }
    }
});

requirejs(['lodash', 'React', 'components/MainView'],
    function (_, React, MainView) {
        'use strict';
        var mountPoint = document.getElementById('main-container');

        window.scrum = React.render(<MainView currentTeam={1}/>, mountPoint);
    }
);