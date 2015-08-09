define(['../../../vendor/lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';
        function createMemberItem(member) {
            return (
                <li
                    onClick={this.changeExistingMember.bind(null, member)}
                    className='matched-member'
                    key={member.id}>
                    {createMatchedMemberName(member, this.state.searchStr)}
                </li>
            );
        }

        function boldenMatch(searchStr, memberNameArr) {
            return memberNameArr.toLowerCase() === searchStr.toLowerCase() ?
                <b>{memberNameArr}</b> :
                memberNameArr;
        }

        function createMatchedMemberName(member, searchStr) {
            var parenthesizedSearchStr = '(' + searchStr + ')';
            var re = new RegExp(parenthesizedSearchStr, 'gi');
            var resultArr = member.name.split(re);
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
            hideMatchedMemberContainer: function () {
                if (this.refs.matchedMemberContainer) {
                    this.refs.matchedMemberContainer.getDOMNode().style.opacity = 0;
                }
            },
            showMatchedMemberContainer: function () {
                if (this.refs.matchedMemberContainer) {
                    this.refs.matchedMemberContainer.getDOMNode().style.opacity = 1;
                }
            },
            changeExistingMember: function (member) {
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_EXISTING_MEMBER, member.id);
                this.hideMatchedMemberContainer();
                this.refs.searchInput.getDOMNode().value = member.name;

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
                this.showMatchedMemberContainer();
                var searchStr = event.target.value;
                this.setState({
                    searchStr: searchStr
                });

            },
            getSearchElement: function () {
                return (
                    <input ref='searchInput' onChange={this.searchMember}
                           onBlur={this.hideMatchedMemberContainer}
                           className='search-input' type='text'/>
                );
            },
            render: function () {
                return (
                    <div>
                        {this.getSearchElement()}
                        {this.getComboBox()}
                    </div>
                );
            }
        });


    });