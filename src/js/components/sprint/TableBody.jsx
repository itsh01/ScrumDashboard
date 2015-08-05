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
                sprint: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            render: function () {
                var sprint = this.props.sprint,
                    rows = _(sprint.members)
                        .map(function (memberId) {
                            return this.context.flux.membersStore.getMemberById(memberId);
                        }, this)
                        .map(function (member) {
                            if (member) {
                                return (<SprintMemberRow
                                    retro={sprint.retroCardsStatus}
                                    cardLifecycle={sprint.cardLifecycle}
                                    key={member.id}
                                    member={member} />);
                            }
                        }, this)
                        .value();

                return (<div className="tbody">
                    {rows}
                </div>);
            }
        });
    }
);