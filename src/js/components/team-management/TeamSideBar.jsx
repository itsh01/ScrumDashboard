define(['lodash', 'React', 'components/team-management/TeamSelector', 'components/team-management/addTeam'],
    function (_, React, TeamSelector, AddTeam) {
        'use strict';
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return React.createClass({
            displayName: 'Teams Sidebar',
            propTypes: {
                allTeams: React.PropTypes.array
            },
            render: function () {
                var activeTeams = _.filter(this.props.allTeams, function (team) {
                    return team.active;
                });
                return (
                    <ReactCSSTransitionGroup transitionName='sidebar' transitionAppear={true} transitionLeave={false}>
                        <div className="sidebar">
                            <TeamSelector teams={activeTeams}/>
                            <AddTeam/>
                        </div>
                    </ReactCSSTransitionGroup>
                );
            }
        });
    });