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
            var teamId = e.target.dataset.id;
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM, teamId);

        },
        removeTeam: function (event) {
            var teamId = event.target.id;
            this.context.flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_TEAM, teamId);
        },

        render: function () {
            return (
                <div className='teams-selector'>
                    {
                        _.map(this.props.teams, function (team) {
                            return (
                                <div className='team-name-container' onClick={this.changeCurrentTeam} key={team.id}
                                    data-id={team.id}>
                                    <div className='team-name' data-id={team.id} key={team.name}>{team.name}
                                    </div>
                                    <button onClick={this.removeTeam}
                                            className='remove-button'
                                            id={team.id}>X</button>
                                </div>
                            );
                        }, this)
                    }
                </div>
            );
        }
    });
});