/**
 * Created by Tzabarc on 7/29/15.
 */

requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        React: '../vendor/react-with-addons',
        components: '../js/components'
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

requirejs(['lodash', 'React', 'components/MainContainer'],
    function (_, React, MainContainer) {
        'use strict';
        var mountPoint = document.getElementById('main-container');

        window.scrum = React.render(<MainContainer currentTeam={1} />, mountPoint);
    }
);