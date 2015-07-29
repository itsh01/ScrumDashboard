var playData = {};
playData.cards = [{
    "id": "7d6f4051-64cb-4a49-aa58-168c4e8358c3",
    "title": "input virtual hard drive",
    "description": "I'll generate the mobile JSON panel, that should panel the JSON panel!",
    "status": "unassigned",
    "points": 1,
    "team": 1,
    "assignee": null,
    "startDate": null,
    "endDate": null
},
    {
        "id": "a91402b2-5ba5-4646-a0e5-b54d1e9e031a",
        "title": "quantify redundant array",
        "description": "If we compress the bus, we can get to the JSON bus through the auxiliary JSON bus!",
        "status": "unassigned",
        "points": 2,
        "team": null,
        "assignee": null,
        "startDate": null,
        "endDate": null
    },
    {
        "id": "27fd6832-d835-4bdc-b7af-612d95c5dfef",
        "title": "hack solid state sensor",
        "description": "If we override the alarm, we can get to the SMS alarm through the optical SMS alarm!",
        "status": "unassigned",
        "points": 3,
        "team": 1,
        "assignee": null,
        "startDate": null,
        "endDate": null
    },
    {
        "id": "ed3a77a6-8db4-4f5e-b95f-1f83372f343c",
        "title": "generate mobile alarm",
        "description": "The AI card is down, generate the mobile card so we can generate the AI card!",
        "status": "unassigned",
        "points": 5,
        "team": 1,
        "assignee": null,
        "startDate": null,
        "endDate": null
    }];

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

requirejs(['lodash', 'React', 'components/card/Card'],
    function (_, React, Card, Backlog, Table) {
        var CardShowcase = React.createClass({displayName: "CardShowcase",
            render: function () {
                return (
                    React.createElement("div", null, 
                        
                            _.map(playData.cards, function(card) {
                                return React.createElement(Card, {title: card.title, description: card.description, points: card.points})
                            })
                        
                    ));
            }
        });
        React.render(
            React.createElement(CardShowcase, null),
            document.getElementById('Card')
        );

    }
);