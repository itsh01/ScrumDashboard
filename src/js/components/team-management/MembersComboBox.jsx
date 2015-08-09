define(['lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';
        function createMemberItem(member) {
            return (
                <li data-id={member.id} data-name={member.name}
                    onClick={this.changeExistingMember}
                    className='matched-member'
                    key={member.id}>
                    {createMatchedMemberName(member.name, this.state.searchStr)}
                </li>
            );
        }

        function boldenMatch(searchStr, memberNameArr) {
            return memberNameArr.toLowerCase() === searchStr.toLowerCase() ?
                <b>{memberNameArr}</b> :
                memberNameArr;
        }

        function createMatchedMemberName(memberName, searchStr) {
            var parenthesizedSearchStr = '(' + searchStr + ')';
            var re = new RegExp(parenthesizedSearchStr, 'gi');
            var resultArr = memberName.split(re);
            return (
                <span>
                    {
                        _.map(resultArr,
                            boldenMatch.bind(null, searchStr))
                    }
                </span>
            );
        }

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
            invisibleMatchedMemberContainer: function () {
                if (this.refs.matchedMemberContainer) {
                    this.refs.matchedMemberContainer.getDOMNode().style.opacity = 0;
                }
            },
            visibleMatchedMemberContainer: function () {
                if (this.refs.matchedMemberContainer) {
                    this.refs.matchedMemberContainer.getDOMNode().style.opacity = 1;
                }
            },
            changeExistingMember: function (event) {
                var memberId = event.target.dataset.id;
                var memberName = event.target.dataset.name;
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_EXISTING_MEMBER, memberId);
                this.invisibleMatchedMemberContainer();
                this.refs.searchInput.getDOMNode().value = memberName;

            },
            getComboBox: function () {
                var allMembers = this.context.flux.membersStore.getAllMembers();
                var currentTeamMembers = this.context.flux.teamsStore.getCurrentTeam().members;
                return this.state.searchStr === '' ?
                    '' :
                    <div className='matched-member-container' ref='matchedMemberContainer'>
                        <ul className='matched-member-list'>
                            {

                                _(allMembers).filter(function (member) {
                                    return !_.includes(currentTeamMembers, member.id) &&
                                        _.includes(member.name.toLowerCase(), this.state.searchStr.toLowerCase());
                                }, this)
                                    .map(createMemberItem, this).value()
                            }
                        </ul>
                    </div>;
            },
            searchMember: function (event) {
                this.visibleMatchedMemberContainer();
                var searchStr = event.target.value;
                this.setState({
                    searchStr: searchStr
                });

            },
            render: function () {
                return (
                    <div>
                        <input ref='searchInput' onChange={this.searchMember}
                               onBlur={this.invisibleMatchedMemberContainer} className='search-input' type='text'/>
                        {this.getComboBox()}
                    </div>
                );
            }
        });


    });