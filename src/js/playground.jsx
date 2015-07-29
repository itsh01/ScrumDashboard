
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

requirejs(['lodash','React', 'components/MainContainer'],
    function (_, React, MainContainer) {

        //
        //var mountPoint = document.getElementById('main-container');
        //
        //React.render(React.createElement(MainContainer, {currentTeam: 1}), mountPoint);
    }
);