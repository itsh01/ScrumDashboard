define([
        'lodash',
        'React',

        'components/backlog/CardsList'
    ],
    function (_, React, CardsList) {
        'use strict';

        return React.createClass({

            displayName: 'Backlog',
            propTypes: {
                teamId: React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any

            },

            render: function () {
                //var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                //var CompanyCards = this.context.flux.cardsStore.getCompanyCards();
                var CompanyCards = this.context.flux.cardsStore.getCompanyCards();

                teamCards = _.filter(teamCards, function (card) {
                    return card.status === 'unassigned';
                });

                return (
                    <div className="blur simple-transition">
                        <h2>Backlog</h2>
                        <CardsList ref="teamCardList" title="Team" cardsList={teamCards}/>
                        <CardsList ref="companyCardList" title="Company" cardsList={CompanyCards}/>
                    </div>
                );
            }
        });
    }
);