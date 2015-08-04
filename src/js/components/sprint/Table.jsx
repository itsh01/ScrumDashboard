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

            getDefaultProps: function () {
                return {
                    sprint: {
                        id: '55b8a160a101c202d3b588bc',
                        name: 'veniam ipsum',
                        scrumMaster: null,
                        startDate: null,
                        endDate: null,
                        cardLifecycle: ['Backlog', 'In progress', 'Done'],
                        members: [
                            '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                            '061804a2-1f93-40e1-bf49-57b82e5b568b'
                        ],
                        state: 0
                    }
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