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

requirejs(['lodash', 'React', 'components/card/Card', 'components/backlog/Backlog', 'components/sprint/Table'],
    function (_, React, Card, Backlog, Table) {
        React.render(
            <Card />,
            document.getElementById('Card')
        );

    }
);