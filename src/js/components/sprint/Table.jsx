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

            lockSprintClicked: function () {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.RETROFY_SPRINT, this.props.sprint.id);
            },

            lockSprintBtn: function () {
                return this.props.sprint.state === constants.SPRINT_STATUS.IN_PROGRESS ?
                    <button className = 'main-view-btn main-view-btn-lock' onClick={this.lockSprintClicked}>Lock Sprint</button> :
                    null;
            },

            render: function () {

                return ( <div className="sprint-table-wrapper">
                    <div className="table-layout board">
                        <TableHeader cardLifecycle={this.props.sprint.cardLifecycle} />
                        <TableBody sprint={this.props.sprint} />
                    </div>
                    <Velocity
                        cardLifecycle={this.props.sprint.cardLifecycle}
                        sprintMembers={this.props.sprint.members} />
                    {this.lockSprintBtn()}
                </div>);
            }
        });
    }
);