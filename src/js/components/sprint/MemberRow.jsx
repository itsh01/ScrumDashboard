define([
        'lodash',
        'React',
        'components/sprint/Member',
        'components/card/Card'
    ],
    function (_, React, SprintMember, Card) {
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

                var cells = _.map(this.props.cardLifecycle, function () {
                    return (<div className="table-cell"><Card /></div>);
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