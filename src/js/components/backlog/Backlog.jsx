
define([
        'lodash',
        'React',
        'components/card/Card',
        'components/card/Card',
        './cardsList'
    ],
    function (_, React, Card, CardsList) {
    'use strict';
    /** jsx React.DOM */

        return React.createClass({

            displayName: 'Backlog',
            contextTypes: {
                flux: React.PropTypes.any
            },
            propTypes: {
                teamId: React.PropTypes.string
            },
            render: function () {
                var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                return <div>
                   <CardsList title="Team backlog" cardsList= {teamCards}/>
                </div>;
            }
        });
    }
);