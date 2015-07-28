define(["lodash", "React"], function (_, React) {

    /** jsx React.DOM */

    return React.createClass({

        displayName: 'Backlog',
        render: function () {

            var teamCards = _.filter(this.props.cards, this.props.teamFilterFn);
            return <div>
                {
                _.map(teamCards, function (card) {
                    return <div>{card.name}</div>;
                }, this)}
            </div>;
        }

    });
});