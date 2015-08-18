define([
        'lodash',
        'React',
        'components/sprint/TableHeader',
        'components/sprint/TableBody',
        'components/sprint/Velocity'
    ],
    function (_, React, TableHeader, TableBody, Velocity) {
        'use strict';

        return React.createClass({
            displayName: 'SprintTable',

            propTypes: {
                cardLifecycle: React.PropTypes.array,
                sprint: React.PropTypes.object
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            childContextTypes: {
                sprintState: React.PropTypes.number,
                scrumMaster: React.PropTypes.string
            },

            getChildContext: function () {
                var sprint = this.props.sprint;
                return {
                    sprintState: sprint.state,
                    scrumMaster: sprint.scrumMaster
                };
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
                        sprintStatus={sprint.status}
                        retro={sprint.retroCardsStatus}
                        sprintId={sprint.id}/>
                </div>);
            }
        });
    }
);