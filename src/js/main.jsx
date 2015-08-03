/**
 * Created by Tzabarc on 7/29/15.
 */

requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        React: '../vendor/react-with-addons',
        ReactRouter: '../vendor/ReactRouter',
        components: '../js/components',
        mixins: '../js/mixins',
        stores: '../js/stores'
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
        }
    }
});

requirejs(['lodash', 'React', 'ReactRouter', 'components/MainContainer', 'components/router-config/routes'],
    function (_, React, ReactRouter, MainContainer, routes) {
        'use strict';
        var mountPoint = document.getElementById('main-container');
        ReactRouter.run(routes, function (Root, state) {
            React.render(<Root {...state} />, mountPoint);
        });
        //window.scrum = React.render(<MainContainer currentTeam={1} />, mountPoint);
    }
);