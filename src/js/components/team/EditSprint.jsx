define(['lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';

        return React.createClass({
            displayName: 'EditSprint',

            propTypes: {
                currTeamId: React.PropTypes.string,
                sprintId: React.PropTypes.substringData
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getInitialState: function () {
                var sprint = this.context.flux.teamsStore.getSprintById(this.props.sprintId);
                console.log(sprint);
                return {sprint};
            },

            render: function () {
                return (
                    <div>
                        <div className=''>
                            <div className=''>
                                <span>Sprint Name:</span>
                            </div>
                            <div className=''>
                                <input type='text' valueLink={this.linkState('name')}></input>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
);

// add members
// change name
// scrum master
//<EditSprint teamId={this.props.team} sprintId={this.state.currSprint}/>