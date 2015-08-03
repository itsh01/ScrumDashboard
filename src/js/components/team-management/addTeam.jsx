define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Add Team',
        getInitialState: function () {
            return {
                isInputVisible: false
            };
        },
        toggleInput: function () {
            this.setState(
                {
                    isInputVisible: !this.state.isInputVisible
                }
            );
        },
        addNewTeam: function(e) {
            e.preventDefault();
            var newTeamInput = this.refs.teamName.getDOMNode();
            console.log(newTeamInput.value);
            newTeamInput.value = '';
        },
        render: function () {
            var resultContent = this.state.isInputVisible ?

                <form onSubmit={this.addNewTeam}>
                    <input ref='teamName' onBlur={this.toggleInput} type='text' className='team-input'
                           autoFocus={true}/>
                </form> :
                <div onClick={this.toggleInput}> plux </div>;

            return (
                <div className='team-name'>
                    {resultContent}
                </div>
            );
        }
    });
});