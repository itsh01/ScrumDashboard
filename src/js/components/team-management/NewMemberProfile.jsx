/**
 * Created by tome on 8/4/15.
 */

define([
        'lodash',
        'React',
        'constants',
        '../general/Search',
        './AddExistingMember',
        './AddNewMember'
    ],
    function (_, React, constants, MembersComboBox, AddExistingMember, AddNewMember) {
        'use strict';
        return React.createClass({
            displayName: 'New Member Profile',
            propTypes: {
                allMembers: React.PropTypes.array,
                currentMember: React.PropTypes.object,
                team: React.PropTypes.object
            },
            getInitialState: function () {
                return {
                    memberType: 'newMember'
                };
            },

            componentDidMount: function () {
                this.refs[this.state.memberType].getDOMNode().checked = 'checked';
            },

            getNewMemberForm: function () {
                return <AddNewMember team={this.props.team}/>;
            },

            getExistingMemberForm: function () {
                return (
                    <AddExistingMember team={this.props.team}
                                       currentMember={this.props.currentMember}
                                       allMembers={this.props.allMembers}/>
                );
            },
            getNewMemberContent: function () {
                return this.state.memberType === 'newMember' ?
                    this.getNewMemberForm() :
                    this.getExistingMemberForm();
            },
            changeMemberType: function (event) {
                var selectedMember = event.target.value;
                this.setState({
                    memberType: selectedMember
                });
            },

            getMemberTypeForm: function () {
                return (
                    <form onChange={this.changeMemberType} className='member-type'>
                        <div>
                            <input ref='newMember' type='radio' id='newMember' name='memberType'
                                   value='newMember'/>
                            <label htmlFor='newMember'>New member</label>
                        </div>
                        <div>
                            <input ref='existingMember' type='radio' id='existingMember' name='memberType'
                                   value='existingMember'/>
                            <label htmlFor='existingMember'>Existing member</label>
                        </div>
                    </form>
                );
            },

            render: function () {
                var classSet = React.addons.classSet;
                return (
                    <div>
                        <div>
                            <h3> add member to team </h3>
                            {this.getMemberTypeForm()}
                        </div>
                        <div className={classSet('member-profile', 'new-member-profile')}>
                            {this.getNewMemberContent()}
                        </div>
                    </div>
                );
            }
        });
    }
);