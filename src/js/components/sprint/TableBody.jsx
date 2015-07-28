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
                cardLifecycle: React.PropTypes.array
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done']
                };
            },
            render: function () {

                var cells = _.map(this.props.cardLifecycle, function (phase) {
                    return (<div className="table-cell">{phase}</div>);
                });

                return (<div className="tbody">
                    <div className="table-row">
                        <div className="table-cell">
                            <SprintMember />
                        </div>
                        {cells}
                    </div>
                </div>);
            }
        });
    }
);