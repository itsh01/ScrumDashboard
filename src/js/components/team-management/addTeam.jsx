define(['lodash', 'React', 'constants'], function (_, React, constants) {
    'use strict';
    return React.createClass({
        displayName: 'Add Team',
        contextTypes: {
            flux: React.PropTypes.any
        },
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
        addNewTeam: function (e) {
            e.preventDefault();
            var newTeamInput = this.refs.teamName.getDOMNode();
            var newTeamObject = this.context.flux.teamsStore.getBlankTeam();
            newTeamObject.name = newTeamInput.value;
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.ADD_TEAM, newTeamObject);
        },
        render: function () {
            var resultContent = this.state.isInputVisible ?

                <form onSubmit={this.addNewTeam}>
                    <input ref='teamName' onBlur={this.toggleInput} type='text' className='team-input'
                           autoFocus={true}/>
                </form> :
                <div onClick={this.toggleInput}>Plus</div>;

            var classSet = React.addons.classSet;
            return (
                <div className={classSet('team-name', 'add-team-button')}>
                    {resultContent}
                </div>
            );
        }
    });
});