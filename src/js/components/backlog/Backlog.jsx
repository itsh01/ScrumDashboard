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

            addNewCard: function (event) {
                event.preventDefault();
                this.context.flux.planningActions.planningAddCard();
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
                    <div className="blur simple-transition rightline backlog">
                        <h2>
                            <span className="empty-state">
                                <span className="empty-state-action" ref="addNewCardButton" onClick={this.addNewCard}>+</span>
                            </span>
                            Backlog
                        </h2>
                        <h3 className="underline">Team</h3>
                        <CardsList ref="teamCardList" title="Team" cardsList={teamCards}/>
                        <h3 className="underline">Company</h3>
                        <CardsList ref="companyCardList" title="Company" cardsList={CompanyCards}/>
                    </div>
                );
            }
        });
    }
);