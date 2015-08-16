define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Add Team',
        contextTypes: {
            flux: React.PropTypes.any,
            blankTeamSchema: React.PropTypes.object
        },
        getInitialState: function () {
            return {
                isInputVisible: false
            };
        },
        componentDidMount: function () {
            this.flux = this.context.flux;
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
            var newTeamObject = this.context.blankTeamSchema;
            newTeamObject.name = newTeamName;
            this.flux.teamsActions.addTeam(newTeamObject);
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