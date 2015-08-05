define([
        'lodash',
        'React',
        'components/sprint/TableHeader',
        'components/sprint/TableBody',
        'components/sprint/Velocity',
        'constants'
    ],
    function (_, React, TableHeader, TableBody, Velocity, constants) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',

            propTypes: {
                cardLifecycle: React.PropTypes.array,
                sprint: React.PropTypes.object
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            childContextTypes: {
                sprintState: React.PropTypes.number
            },

            getChildContext: function () {
                return {
                    sprintState: this.props.sprint.state
                };
            },

            lockSprint: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.RETROFY_SPRINT, this.props.sprint.id);
            },

            getLockSprintButton: function () {
                if (this.props.sprint.state === constants.SPRINT_STATUS.IN_PROGRESS) {
                    return <button className = 'main-view-btn main-view-btn-lock' onClick={this.lockSprint}>Lock Sprint</button>;
                }
                return null;
            },

            render: function () {

                var sprint = this.props.sprint;
                
                return ( <div className="sprint-table-wrapper">
                    <div className="table-layout board">
                        <TableHeader cardLifecycle={sprint.cardLifecycle} />
                        <TableBody sprint={sprint} />
                    </div>
                    <Velocity
                        cardLifecycle={sprint.cardLifecycle}
                        sprintMembers={sprint.members}
                        retro={sprint.retroCardsStatus}/>
                    {this.getLockSprintButton()}
                </div>);
            }
        });
    }
);