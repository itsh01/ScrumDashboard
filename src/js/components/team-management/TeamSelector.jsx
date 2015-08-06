define(['lodash', 'React', 'components/team-management/TeamButton'], function (_, React, TeamButton) {
    'use strict';
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    return React.createClass({
        displayName: 'Team Selector',

        propTypes: {
            teams: React.PropTypes.array
        },
        contextTypes: {
            flux: React.PropTypes.any
        },
        render: function () {
            return (
                <div className='teams-selector'>
                    <ReactCSSTransitionGroup transitionName='teams-list'>
                        {
                            _.map(this.props.teams, function (team) {
                                return <TeamButton team={team} key={team.id}/>;
                            }, this)
                        }
                    </ReactCSSTransitionGroup>
                </div>
            );
        }
    });
});