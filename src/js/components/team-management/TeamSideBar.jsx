define(['lodash', 'React', 'components/team-management/TeamSelector', 'components/team-management/addTeam'],
    function (_, React, TeamSelector, AddTeam) {
        'use strict';
        return React.createClass({
            displayName: 'Teams Sidebar',
            propTypes: {
                allTeams: React.PropTypes.array
            },
            render: function () {
                return (
                    <div className="sidebar">
                        <TeamSelector teams={this.props.allTeams}/>
                        <AddTeam/>
                    </div>
                );
            }
        });
    });