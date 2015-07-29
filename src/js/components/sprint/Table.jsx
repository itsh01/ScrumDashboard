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
                cardLifecycle: React.PropTypes.array
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done']
                };
            },
            render: function () {
                return (<div className="sprint-table-wrapper">
                            <div className="table-layout board">
                                <TableHeader cardLifecycle={this.props.cardLifecycle} />
                                <TableBody cardLifecycle={this.props.cardLifecycle} />
                            </div>
                        </div>);
            }
        });
    }
);