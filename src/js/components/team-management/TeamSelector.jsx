define(['lodash', 'React', 'constants'], function (_, React, constants) {
    'use strict';


    return React.createClass({
        displayName: 'Team Selector',

        propTypes: {
            teams: React.PropTypes.array
        },
        contextTypes: {
            flux: React.PropTypes.any
        },

        changeCurrentTeam: function (e) {
            var teamId = e.target.id;
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM, teamId);

        },
        removeTeam: function (event) {
            //TODO
            console.log(event.target.id);
        },

        render: function () {
            return (
                <div className='teams-selector'>
                    {
                        _.map(this.props.teams, function (team) {
                            return (
                                <div>
                                    <div className='team-name' id={team.id} key={team.name}
                                         onClick={this.changeCurrentTeam}>{team.name}
                                    </div>
                                    <button onClick={this.removeTeam} id={team.id}>X</button>
                                </div>
                            );
                        }, this)
                    }
                </div>
            );
        }
    });
});