define(['lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';
        return React.createClass({
            displayName: 'membersCombobox',
            contextTypes: {
                flux: React.PropTypes.any
            },
            getInitialState: function () {
                return {
                    searchStr: ''
                };
            },
            changeExistingMember: function (event) {
                var memberId = event.target.dataset.id;
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_EXISTING_MEMBER, memberId);
                this.refs.matchedMemberContainer.getDOMNode().style.display = 'none';
                this.refs.searchInput.getDOMNode().value = event.target.dataset.name;

            },
            getComboBox: function () {
                var allMembers = this.context.flux.membersStore.getAllMembers();
                return this.state.searchStr === '' ? <li className='matched-member'></li> :
                    <div className='matched-member-container' ref='matchedMemberContainer'>
                        <ul className='matched-member-list'>
                            {
                                _(allMembers).filter(function (member) {
                                    return _.includes(member.name.toLowerCase(), this.state.searchStr.toLowerCase());
                                }, this)
                                    .map(function (member) {
                                        return (
                                            <li data-id={member.id} data-name={member.name} onClick={this.changeExistingMember}
                                                className='matched-member'>
                                                {member.name}
                                            </li>
                                        );
                                    }, this).value()
                            }
                        </ul>
                    </div>;
            },
            searchMember: function (event) {
                var searchStr = event.target.value;
                this.setState({
                    searchStr: searchStr
                });

            },
            render: function () {
                return (
                    <div>
                        <input ref='searchInput' onChange={this.searchMember} className='search-input' type='text'/>
                        {this.getComboBox()}
                    </div>
                );
            }
        });


    });