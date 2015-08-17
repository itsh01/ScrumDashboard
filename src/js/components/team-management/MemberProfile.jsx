define(['lodash', 'React', 'constants', 'DragDropMixin'],
    function (_, React, constants, DragDropMixin) {
        'use strict';
        return React.createClass({
            displayName: 'Member Profile',
            propTypes: {
                member: React.PropTypes.object,
                team: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            mixins: [DragDropMixin],

            componentDidMount: function () {
                this.flux = this.context.flux;
            },

            dragDrop: function () {
                return {
                    draggable: true,
                    dropType: 'memberId',
                    dataTransfer: this.props.member.id
                };
            },

            removeMember: function (event) {
                var memberId = event.target.id;
                var teamId = this.props.team.id;
                this.flux.teamsActions.removeMemberFromTeam(teamId, memberId);
            },

            getMemberHeading: function (member) {
                var classSet = React.addons.classSet;
                return (
                    <h3
                        className={classSet('member-name')}>{member.name}
                    </h3>
                );
            },

            getMemberImage: function (member) {
                return (
                    <img className='member-img'
                         draggable={false}
                         alt={member.name}
                         src={member.image}/>
                );
            },

            createRemoveMemberButton: function (member) {
                return (
                    <button
                        className='remove-button' onClick={this.removeMember} id={member.id}>X
                    </button>
                );
            },


            render: function () {
                var classSet = React.addons.classSet;
                var member = this.props.member;
                return (
                    <div className={classSet('member-profile', 'inline-block')}>
                        {this.getMemberHeading(member)}
                        {this.getMemberImage(member)}
                        {this.createRemoveMemberButton(member)}
                    </div>
                );
            }
        });
    });



