define([
        'lodash',
        'React',
        'components/sprint/Member'
    ],
    function (_, React, SprintMember) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Body',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                members: React.PropTypes.array
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    members: [{}, {}, {}]
                };
            },
            render: function () {

                var cells = _.map(this.props.cardLifecycle, function (phase) {
                    return (<div className="table-cell">{phase}</div>);
                });

                return (<div className="table-row">
                    <div className="table-cell">
                        <SprintMember />
                    </div>
                    {cells}
                </div>);
            }
        });
    }
);