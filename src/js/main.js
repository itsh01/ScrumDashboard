/**
 * Created by itaysh on 7/27/15.
 */

requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        React: '../vendor/react-with-addons',
        componenets: '../js/components',
        Card: '../js/components/Cards/Card'
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

requirejs(['lodash','React', 'Card'],
    function (_, React, Card) {

        var mountPoint = document.getElementById('main-container');

        React.render(React.createElement(Card, {}), mountPoint);
    }
);