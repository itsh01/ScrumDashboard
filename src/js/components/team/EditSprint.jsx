define([
        'lodash',
        'React',
        'constants',
        'components/team/ComboBox'
    ],
    function (_, React, constants, ComboBox) {
        'use strict';

        return React.createClass({
            displayName: 'EditSprint',

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getInitialState: function () {
                return this.context.flux.teamsStore.getCurrentSprint();
            },

            teamMemberOptionsBox: function () {
                var flux = this.context.flux,
                    teamMembers = flux.teamsStore.getCurrentTeam().members,
                    options = _(teamMembers)
                        .map(function (memberId) {
                            return flux.membersStore.getMemberById(memberId);
                        })
                        .map(function (member) {
                            return (<option
                                value={member.id}
                                key={member.id}>
                                {member.name}
                            </option>);
                        })
                        .value();

                return (<select onChange={this.changeScrumMaster} value={this.state.scrumMaster}>
                    <option value={null} disabled>-</option>
                    {options}
                </select>);
            },

            changeScrumMaster: function (e) {
                this.setState({scrumMaster: e.target.value}, this.updateSprint);
            },

            updateSprint: function () {
                var sprintData = _.cloneDeep(this.state),
                    teamsStore = this.context.flux.teamsStore;
                delete sprintData.id;


                this.context.flux.dispatcher.dispatchAction(
                    constants.actionNames.UPDATE_SPRINT,
                    this.state.id,
                    sprintData,
                    teamsStore.getCurrentTeam().id
                );
            },
            toggleTeamMember: function (memberId) {
                var members = this.state.members;

                if (_.includes(members, memberId)) {
                    _.remove(members, function (currentMember) {
                        return currentMember === memberId;
                    });
                } else {
                    members.push(memberId);
                }

                this.updateSprint();
            },

            teamMembersCheckBoxes: function () {
                var teamMembers = this.context.flux.teamsStore.getCurrentTeam().members;
                var membersStore = this.context.flux.membersStore;

                return _(teamMembers)
                    .map(function getMemberById(memberId) {
                        return membersStore.getMemberById(memberId);
                    })
                    .map(function mapMemberToInput(member) {
                        return (<label
                            key={member.id}>
                            <input
                                checked={_.includes(this.state.members, member.id)}
                                onChange={this.toggleTeamMember.bind(this, member.id)}
                                type='checkbox'
                                >
                            </input>
                            {member.name}
                        </label>);

                    }, this)
                    .value();
            },

            getFieldWrapper: function (text, fields) {

                return (
                    <div className=''>
                        <div className=''>
                            <span>{text}</span>
                        </div>
                        <div className=''>
                            {fields}
                        </div>
                    </div>
                );
            },
            listenForStateChange: function () {
                var currentSprint = this.context.flux.teamsStore.getCurrentSprint();
                if (!_.isEqual(currentSprint, this.state)) {
                    this.updateSprint();
                }
            },
            render: function () {
                return (
                    <div className="edit-sprint" onKeyUp={this.listenForStateChange}>
                        {this.getFieldWrapper('Sprint Name:', <input type='text'
                                                                     valueLink={this.linkState('name')}></input>)}
                        {this.getFieldWrapper('Scrum Master:', this.teamMemberOptionsBox())}
                        {this.getFieldWrapper('Select Sprint Members:', this.teamMembersCheckBoxes())}
                        {this.getFieldWrapper('Start Date:', <input type='text'
                                                                    valueLink={this.linkState('startDate')}></input>)}
                        {this.getFieldWrapper('End Date:', <input type='text'
                                                                  valueLink={this.linkState('endDate')}></input>)}
                        {this.getFieldWrapper('Add Phase To Lifecycle', <ComboBox lifecycle={this.state.cardLifecycle} />)}

                    </div>
                );
            }
        });
    }
);
