define([
        'lodash',
        'React',

        'components/card/Card',
        'components/backlog/cardsList',

        'mixins/DragDropMixin'
    ],
    function (_, React, Card, CardsList/*, DragDropMixin*/) {
        'use strict';

        return React.createClass({

            displayName: 'Backlog',
            propTypes: {
                teamId: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            //mixins: [DragDropMixin],
            getInitialState: function () {
                return {

                };
            },
            //dragDrop: function () {
            //
            //    var self = this;
            //
            //    return {
            //        droppable: true,
            //        acceptableDrops: ['card'],
            //        drop: function (card) {
            //
            //            var newCardData = {
            //                status: 'unassigned',
            //                assignee: null
            //            };
            //
            //            self.context.flux.dispatcher.dispatchAction(
            //                'UPDATE_CARD',
            //                card.id,
            //                newCardData
            //            );
            //        }
            //    };
            //},

            render: function () {
                var teamCards = this.context.flux.cardsStore.getTeamCards(this.props.teamId);
                var CompanyCards = this.context.flux.cardsStore.getCompanyCards();

                teamCards = _.filter(teamCards, function (card) {
                    return card.status === 'unassigned';
                });

                return (
                    <div>
                        <h2>Backlog</h2>
                        <CardsList title="Team" cardsList={teamCards}/>
                        <CardsList title="Company" cardsList={CompanyCards}/>
                    </div>
                );
            }
        });
    }
);