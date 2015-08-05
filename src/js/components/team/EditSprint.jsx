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

            getInitialState: function () {

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