define(['../../../vendor/lodash', 'React'],
    function (_, React) {
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

        function boldenMatch(searchStr, memberNameArr, index) {

            return memberNameArr.toLowerCase() === searchStr.toLowerCase() ?
                <b key={index}>{memberNameArr}</b> :
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
            displayName: 'Search element',
            propTypes: {
                excludedCollection: React.PropTypes.array,
                searchCollection: React.PropTypes.array

            },
            contextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {
                return {
                    searchStr: ''
                };
            },
            setMatchedItemContainerVisibility: function (newVisibility) {
                if (this.refs.matchedItemContainer) {
                    this.refs.matchedItemContainer.getDOMNode().style.opacity = newVisibility;
                }
            },
            changeExistingMember: function (member) {
                this.context.flux.teamsActions.changeExistingMemberId(member.id);
                this.setMatchedItemContainerVisibility(0);
                this.refs.searchInput.getDOMNode().value = member.name;

            },
            filterSearchResults: function () {
                var allItems = this.props.searchCollection;
                var excludedCollection = this.props.excludedCollection;
                return _(allItems).filter(function (item) {
                    return !_.includes(excludedCollection, item.id) &&
                        _.includes(item.name.toLowerCase(), this.state.searchStr.toLowerCase());
                }, this).value();
            },
            getSearchResultsContainer: function () {
                return this.state.searchStr === '' ?
                    '' :
                    <div className='matched-member-container' ref='matchedItemContainer'>
                        <ul className='matched-member-list'>
                            {
                                _.map(this.filterSearchResults(), createMemberItem, this)
                            }
                        </ul>
                    </div>;
            },
            searchItem: function (event) {
                var searchStr = event.target.value;
                this.setState({
                    searchStr: searchStr
                });
                this.setMatchedItemContainerVisibility(1);
            },
            getSearchInput: function () {
                return (
                    <input ref='searchInput' onChange={this.searchItem}
                           onBlur={this.setMatchedItemContainerVisibility.bind(this, 0)}
                           className='search-input' type='text'/>
                );
            },
            render: function () {
                return (
                    <div>
                        {this.getSearchInput()}
                        {this.getSearchResultsContainer()}
                    </div>
                );
            }
        });


    });