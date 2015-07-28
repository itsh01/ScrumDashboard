define([
        'lodash',
        'React',
        'components/sprint/MemberRow'
    ],
    function (_, React, SprintMemberRow) {
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

                var rows = _.map(this.props.members, function () {
                    return (<SprintMemberRow />);
                });

                return (<div className="tbody">
                    {rows}
                </div>);
            }
        });
    }
);