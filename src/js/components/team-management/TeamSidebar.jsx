define(['lodash', 'React', 'components/team-management/TeamSelector', 'components/team-management/AddTeam'],
    function (_, React, TeamSelector, AddTeam) {
        'use strict';
        return React.createClass({
            displayName: 'Teams Sidebar',
            propTypes: {
                allTeams: React.PropTypes.array,
                currentTeam: React.PropTypes.object
            },
            render: function () {
                var activeTeams = _.filter(this.props.allTeams, function (team) {
                    return team.active;
                });
                return (
                    <div className="sidebar">
                        <AddTeam/>
                        <TeamSelector teams={activeTeams} currentTeam={this.props.currentTeam}/>
                    </div>
                );
            }
        });
    });