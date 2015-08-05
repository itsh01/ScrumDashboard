/**
 * Created by tome on 8/4/15.
 */

define([
        'lodash',
        'React',
        'constants'
    ],
    function (_, React, constants) {
        'use strict';
        return React.createClass({
            displayName: 'New Member Profile',
            propTypes: {
                team: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },

            addNewMember: function () {
                var teamId = this.props.team.id;
                var memberName = this.refs.memberName.getDOMNode().value;
                var memberImgUrl = this.refs.memberImgUrl.getDOMNode().value || 'img/mosh.jpg';
                var newMember = this.context.flux.membersStore.getBlankMember();
                newMember.name = memberName;
                newMember.image = memberImgUrl;
                this.context.flux.dispatcher.dispatchAction(
                    constants.actionNames.CREATE_MEMBER_INTO_TEAM, newMember, teamId);

            },
            render: function () {
                var classSet = React.addons.classSet;
                return (
                    <div>
                        <div>
                            <h3> add member to team </h3>

                            <form className='member-type'>
                                <input type='radio' id='newMember' name='memberType' value='newMember'/>
                                <label htmlFor='newMember'>New member</label>
                                <input type='radio' id='existingMember' name='memberType' value='existingMember'/>
                                <label htmlFor='existingMember'>Existing member</label>
                            </form>
                        </div>
                        <div className={classSet('member-profile', 'new-member-profile')}>
                            <form onSubmit={this.addNewMember}>
                                <input ref='memberName' type='text' placeholder='Member name'
                                       className='member-name-input'/>
                                <img src='img/mosh.jpg' alt='mosh is cute' className='member-img'/>
                                <input ref='memberImgUrl' type='url' placeholder='image url'
                                       className='img-url-input'/>
                                <button type="submit" className="hidden"></button>
                            </form>
                        </div>
                    </div>
                );
            }
        });
    }
);