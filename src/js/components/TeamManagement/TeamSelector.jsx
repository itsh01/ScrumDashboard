define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Team Selector',
        render: function () {
            return (
                <div className='teams-selector'>
                    {
                        _.map(this.props.teams, function (team) {
                            return <div className='team-name' key={team.name}>{team.name}</div>;
                        })
                    }
                </div>
            );
        }
    });
});