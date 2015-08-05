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
                var options = _.map(teamMembers, function (member) {
                    var memberName = this.context.flux.membersStore.getMemberById(member).name;
                    return (<input type='checkbox' value={member}>{memberName}</input>);
                }.bind(this));
                return options;
            },

            render: function () {
                return (
                    <div>
                        <div className=''>
                            <div className=''>
                                <span>Sprint Name:</span>
                            </div>
                            <div className=''>
                                <input type='text' valueLink={this.linkState('name')}></input>
                            </div>
                        </div>
                        <div className=''>
                            <div className=''>
                                <span>Scrum Master:</span>
                            </div>
                            <div className=''>
                                {this.teamMemberOptionsBox()}
                            </div>
                        </div>
                        <div className=''>
                            <div className=''>
                                <span>Select Sprint Members:</span>
                            </div>
                            <div className=''>
                                {this.teamMembersCheckBoxes()}
                            </div>
                        </div>
                        <div className=''>
                            <div className=''>
                                <span>Start Date:</span>
                            </div>
                            <div className=''>
                                <input type='text' valueLink={this.linkState('startDate')}></input>
                            </div>
                        </div>
                        <div className=''>
                            <div className=''>
                                <span>End Date:</span>
                            </div>
                            <div className=''>
                                <input type='text' valueLink={this.linkState('endDate')}></input>
                            </div>
                        </div>

                    </div>
                );
            }
        });
    }
);

// add members
// change name
// scrum master
//<EditSprint teamId={this.props.team} sprintId={this.state.currSprint}/>