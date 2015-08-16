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
                newFlux: React.PropTypes.any
            },
            createSprintMemberRow: function (sprint, member) {
                return member ? (<SprintMemberRow
                    retro={sprint.retroCardsStatus}
                    cardLifecycle={sprint.cardLifecycle}
                    key={member.id}
                    member={member}/>
                ) : null;
            },
            render: function () {
                var sprint = this.props.sprint,
                    rows = _(sprint.members)
                        .map(this.context.newFlux.membersStore.getMemberById)
                        .map(function (member) {
                            return this.createSprintMemberRow(sprint, member);
                        }, this)
                        .value();

                return (<div className="tbody">
                    {rows}
                </div>);
            }
        });
    }
);