define([
        'lodash',
        'React',

        'components/sprint/HeapCardsContainer',
        'components/sprint/StackCardsContainer',

        'DragDropMixin',

        'constants'
    ],
    function (_, React, HeapCardsContainer, StackCardsContainer, DragDropMixin, constants) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Cell',
            propTypes: {
                assignee: React.PropTypes.string,
                cards: React.PropTypes.array,
                status: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any,
                teamId: React.PropTypes.string,
                sprintState: React.PropTypes.number
            },
            mixins: [DragDropMixin],
            componentDidMount: function () {
                this.context.newFlux.cardsStore.addChangeListener(this.onChange);
                this.context.newFlux.teamsStore.addChangeListener(this.onChange);
            },
            componentWillUnmount: function () {
                this.context.newFlux.cardsStore.removeChangeListener(this.onChange);
                this.context.newFlux.teamsStore.removeChangeListener(this.onChange);
            },
            onChange: function () {
                this.forceUpdate();
            },
            dragDrop: function () {


                var locked = constants.SPRINT_STATUS.RETRO === this.context.sprintState,
                    self = this;

                return {
                    droppable: !locked,
                    acceptableDrops: ['card'],
                    drop: function (card) {

                        var isInProgress = constants.SPRINT_STATUS.IN_PROGRESS === self.context.sprintState;

                        if (card.status === 'unassigned' && isInProgress) {
                            return;
                        }

                        var newCardData = {
                            status: self.props.status,
                            assignee: self.props.assignee,
                            team: self.context.teamId
                        };
                        self.context.newFlux.cardsActions.updateCard(
                            card.id,
                            newCardData
                        );



                    }
                };
            },
            render: function () {
                var cardsContainer = (this.props.cards.length > 3) ? <HeapCardsContainer cards={this.props.cards} /> : <StackCardsContainer cards={this.props.cards} />;
                return (
                    <div className="table-cell">
                        {cardsContainer}
                    </div>
                );
            }
        });
    }
);