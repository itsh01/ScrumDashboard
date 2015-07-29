define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'TeamManagement',
        contextTypes: {
            flux: React.PropTypes.any
        },
        render: function () {
            return (
                <div className='teams-selector'>
                    {
                        _.map(this.context.flux.teamsStore.getAllTeams(), function (team) {
                            return <div className='team-name'>{team.name}</div>;
                        })
                    }
                </div>
            );
        }
    });
});