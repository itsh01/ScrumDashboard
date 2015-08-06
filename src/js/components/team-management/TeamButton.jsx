define(['lodash', 'React', 'constants'],
    function (_, React, constants) {
        'use strict';
        return React.createClass({
            displayName: 'Team Button',
            propTypes: {
                team: React.PropTypes.object
            },
            contextTypes: {
                flux: React.PropTypes.any
            },
            changeCurrentTeam: function (e) {
                var teamId = e.target.dataset.id;
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.CHANGE_CURRENT_TEAM, teamId);

            },
            removeTeam: function (event) {
                event.stopPropagation();
                var teamId = event.target.id;
                console.log(teamId);
                this.context.flux.dispatcher.dispatchAction(constants.actionNames.DEACTIVATE_TEAM, teamId);
            },
            render: function () {
                var team = this.props.team;
                return (
                    <div className='team-management-button' onClick={this.changeCurrentTeam} key={team.id}
                         data-id={team.id}>
                        <div className='team-name' data-id={team.id} key={team.name}>{team.name}
                        </div>
                        <button onClick={this.removeTeam}
                                className='remove-button'
                                id={team.id}>X
                        </button>
                    </div>
                );
            }
        });
    });