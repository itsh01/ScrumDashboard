define([
        'lodash',
        'React',
        'components/card/Card',
        './cardsList'
    ],
    function (_, React, Card, CardsList) {
        'use strict';

        /** jsx React.DOM */
        return React.createClass({

            displayName: 'Backlog',
            propTypes: {
                teamId: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            getInitialState: function () {
                return {

                };
            },
            render: function () {
                var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                return (<div>
                    <CardsList title="Team backlog" cardsList={teamCards}/>
                    <CardsList title="Company backlog" cardsList={teamCards}/>
                </div>);
            }
        });
    }
);