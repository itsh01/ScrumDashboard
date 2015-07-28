
define(['lodash', 'React'], function (_, React) {
    'use strict';
    /** jsx React.DOM */

    return React.createClass({

        displayName: 'Backlog',
        contextTypes: {
            flux: React.PropTypes.any
        },
        render: function () {
            var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
            return <div>
                {
                _.map(teamCards, function (card) {
                    return <div>{card.name}</div>;
                }, this)}
            </div>;
        }

    });
});