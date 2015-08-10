define(['lodash', 'React', 'constants'], function (_, React, constants) {
    'use strict';
    return React.createClass({
        displayName: 'Add Team',
        contextTypes: {
            flux: React.PropTypes.any
        },
        componentDidMount: function () {
            this.dispatcher = this.context.flux.dispatcher;
            this.teamsStore = this.context.flux.teamsStore;
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
        addNewTeam: function (event) {
            event.preventDefault();
            var newTeamName = this.refs.teamName.getDOMNode().value;
            var newTeamObject = this.teamsStore.getBlankTeam();
            newTeamObject.name = newTeamName;
            this.dispatcher.dispatchAction(constants.actionNames.ADD_TEAM, newTeamObject);
        },

        createAddTeamElement: function () {
            return (
                <form onSubmit={this.addNewTeam}>
                    <input ref='teamName' onBlur={this.toggleInput} type='text' className='team-input'
                           autoFocus={true}/>
                </form>
            );
        },

        createPlusElement: function () {
            return (
                <div onClick={this.toggleInput}
                     className='team-name'>Add Team
                </div>
            );
        },
        render: function () {
            var resultContent = this.state.isInputVisible ?

                this.createAddTeamElement() :
                this.createPlusElement();

            var classSet = React.addons.classSet;
            return (
                <div className={classSet('team-management-button', 'add-team-button')}>
                    {resultContent}
                </div>
            );
        }
    });
});