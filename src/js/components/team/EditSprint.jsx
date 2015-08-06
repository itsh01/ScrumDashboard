define(['lodash', 'React', 'constants'],
    function (_, React) {
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

            teamMemberOptionsBox: function (callback) {
                var teamMembers = this.context.flux.teamsStore.getCurrentTeam().members;
                var options = _.map(teamMembers, function (member) {
                    var memberName = this.context.flux.membersStore.getMemberById(member).name;
                    return (<option value={member} key={member}>{memberName}</option>);
                }.bind(this));
                return (<select onChange={callback}>
                    <option selected disabled>-</option>
                    {options}
                </select>);
            },

            teamMembersCheckBoxes: function () {
                var teamMembers = this.context.flux.teamsStore.getCurrentTeam().members;
                var membersStore = this.context.flux.membersStore;

                return _(teamMembers)
                    .map( function getMemberById(memberId) {
                        return membersStore.getMemberById(memberId);
                    })
                    .map(function mapMemberToInput(member) {
                        return (<label>
                            <input
                                checked = {_.includes(this.state.members, member.id)}
                                type='checkbox'
                                key={member.id}>
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

            render: function () {
                return (
                    <div className="edit-sprint">
                        {this.getFieldWrapper('Sprint Name:', <input type='text' valueLink={this.linkState('name')}></input>)}
                        {this.getFieldWrapper('Scrum Master:', this.teamMemberOptionsBox())}
                        {this.getFieldWrapper('Select Sprint Members:', this.teamMembersCheckBoxes())}
                        {this.getFieldWrapper('Start Date:', <input type='text' valueLink={this.linkState('startDate')}></input>)}
                        {this.getFieldWrapper('End Date:', <input type='text' valueLink={this.linkState('endDate')}></input>)}
                        {this.getFieldWrapper('Add Phase To Lifecycle', <input type='text' onClick={this.addPhaseToLifecycle}></input>)}
                    </div>
                );
            }
        });
    }
);
