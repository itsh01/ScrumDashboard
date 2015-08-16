define([
        'lodash',
        'React',

        'components/card/Card',
        'components/backlog/CardsList'
    ],
    function (_, React, Card, CardsList) {
        'use strict';

        return React.createClass({

            displayName: 'Backlog',
            propTypes: {
                teamId: React.PropTypes.string
            },

            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any

            },
            componentDidMount: function () {
                this.context.newFlux.cardsStore.addChangeListener(this.onChange);
                this.context.newFlux.teamsStore.addChangeListener(this.onChange);
                this.context.newFlux.membersStore.addChangeListener(this.onChange);
            },

            componentWillUnmount: function () {
                this.context.newFlux.cardsStore.removeChangeListener(this.onChange);
                this.context.newFlux.teamsStore.removeChangeListener(this.onChange);
                this.context.newFlux.membersStore.removeChangeListener(this.onChange);
            },
            onChange: function () {
                this.setState({});
            },


            render: function () {
                //var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                var teamCards = this.context.newFlux.cardsStore.getTeamCards(this.props.teamId);
                //var CompanyCards = this.context.flux.cardsStore.getCompanyCards();
                var CompanyCards = this.context.newFlux.cardsStore.getCompanyCards();

                teamCards = _.filter(teamCards, function (card) {
                    return card.status === 'unassigned';
                });

                return (
                    <div>
                        <h2>Backlog</h2>
                        <CardsList ref="teamCardList" title="Team" cardsList={teamCards}/>
                        <CardsList ref="companyCardList" title="Company" cardsList={CompanyCards}/>
                    </div>
                );
            }
        });
    }
);