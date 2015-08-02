define(['lodash', 'React', '../../stores/actionNames'], function (_, React, TeamsActions) {
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
            this.context.flux.dispatcher.dispatchAction(TeamsActions.CHANGE_CURRENT_TEAM, teamId);

        },

        render: function () {
            return (
                <div className='teams-selector'>
                    {
                        _.map(this.props.teams, function (team) {
                            return (<div className='team-name' id={team.id} key={team.name}
                                         onClick={this.changeCurrentTeam}>{team.name}</div>);
                        }, this)
                    }
                </div>
            );
        }
    });
});