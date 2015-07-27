/**
 * Created by itaysh on 7/27/15.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        lodash: 'vendor/lodash',
        React: 'vendor/react-with-addons'
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

requirejs(['lodash','React', 'js/components/MainContainer'],
    function (_, React, MainContainer) {

        var mountPoint = document.getElementById('main-container');

        React.render(React.createElement(MainContainer, {}), mountPoint);
    }
);