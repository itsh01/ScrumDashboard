var playData = {};
playData.cards = [
    {
        "id": "7d6f4051-64cb-4a49-aa58-168c4e8358c3",
        "name": "input virtual hard drive",
        "description": "I'll generate the mobile JSON panel, that should panel the JSON panel!",
        "status": "unassigned",
        "score": 1,
        "team": 1,
        "assignee": null,
        "startDate": null,
        "endDate": null
    },
    {
        "id": "a91402b2-5ba5-4646-a0e5-b54d1e9e031a",
        "name": "quantify redundant array",
        "description": "If we compress the bus, we can get to the JSON bus through the auxiliary JSON bus!",
        "status": "unassigned",
        "score": 2,
        "team": null,
        "assignee": null,
        "startDate": null,
        "endDate": null
    },
    {
        "id": "27fd6832-d835-4bdc-b7af-612d95c5dfef",
        "name": "hack solid state sensor",
        "description": "If we override the alarm, we can get to the SMS alarm through the optical SMS alarm!",
        "status": "unassigned",
        "score": 3,
        "team": 1,
        "assignee": null,
        "startDate": null,
        "endDate": null
    },
    {
        "id": "ed3a77a6-8db4-4f5e-b95f-1f83372f343c",
        "name": "generate mobile alarm",
        "description": "The AI card is down, generate the mobile card so we can generate the AI card!",
        "status": "unassigned",
        "score": 5,
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

requirejs(
    [
        'lodash',
        'React',
        'components/card/Card',
        'components/team/TeamManagement',
        'stores/flux',
        'components/planning/CardEditCreate'
    ],
    function (_,
              React,
              Card,
              TeamManagement,
              Flux,
              PlanningCardEditCreate) {


        var CardShowcase = React.createClass({
            render: function () {
                return (
                    <div>
                        {
                            _.map(playData.cards, function (card) {
                                return <Card card={card}/>
                            })
                        }
                    </div>);
            }
        });
        var Playground = React.createClass({
            childContextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {
                this.flux = new Flux();
                this.flux.dispatcher.registerEventsHandled(this.forceUpdate);
                return {};
            },

            getChildContext: function () {
                return {
                    flux: this.flux
                };
            },

            render: function () {
                return <div>
                    <PlanningCardEditCreate />
                    <TeamManagement />
                </div>

            }
        });

        React.render(
            <Playground/>,
            document.getElementById('MainPlayground')
        );

    }
);