define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table', 'components/backlog/Backlog', 'constants'],
    function (_, React, ChangeSprint, SprintTable, BackLog, constants) {
        'use strict';

        return React.createClass({
            displayName: 'TeamView',

            propTypes: {
                currTeamId: React.PropTypes.string
                sprintId: React.PropTypes.substringData,
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {
                var sprintValues = this.getSprintValues(this.props);
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_SPRINT, sprintValues.currSprint.id);
                return sprintValues;
            },



            render: function () {
                return (
                    <div>

                    </div>
                );
            }
        });
    }
);

//<EditSprint teamId={this.props.team} sprintId={this.state.currSprint}/>