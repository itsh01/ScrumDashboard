define(['lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';
        return React.createClass({
            displayName: 'membersCombobox',
            propTypes: {
                searchStr: React.PropTypes.string
            },
            contextTypes: {
                flux: React.PropTypes.any
            },

            changeExistingMember: function (event) {
                var memberId = event.target.dataset.id;
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_EXISTING_MEMBER, memberId);

            },
            render: function () {
                var allMembers = this.context.flux.membersStore.getAllMembers();

                return (
                    this.props.searchStr === '' ? <li className='matched-member'></li> :
                        <div className='matched-member-container'>
                            <ul className='matched-member-list'>
                                {
                                    _(allMembers).filter(function (member) {
                                        return _.includes(member.name.toLowerCase(), this.props.searchStr.toLowerCase());
                                    }, this)
                                        .map(function (member) {
                                            return (
                                                <li data-id={member.id} onClick={this.changeExistingMember}
                                                    className='matched-member'>
                                                    {member.name}
                                                </li>
                                            );
                                        }, this).value()
                                }
                            </ul>
                        </div>
                );
            }
        });


    });