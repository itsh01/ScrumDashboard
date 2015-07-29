define([
        'lodash',
        'React',
        'components/sprint/TableHeader',
        'components/sprint/TableBody'
    ],
    function (_, React, TableHeader, TableBody) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                sprint: React.PropTypes.object
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
            render: function () {
                return (<div className="sprint-table-wrapper">
                            <div className="table-layout board">
                                <TableHeader cardLifecycle={this.props.sprint.cardLifecycle} />
                                <TableBody sprint={this.props.sprint} />
                            </div>
                        </div>);
            }
        });
    }
);