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
                    members: [{}, {}, {}]
                };
            },
            render: function () {
                var self = this,
                    rows = _.map(this.props.members, function () {
                    return (<SprintMemberRow cardLifecycle={self.props.cardLifecycle}/>);
                });

                return (<div className="tbody">
                    {rows}
                </div>);
            }
        });
    }
);