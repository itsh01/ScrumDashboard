/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',

        'components/backlog/Backlog',
        'components/sprint/Table',
        'components/team/TeamComponent',

        '../stores/flux'
    ],
    function (_, React, Backlog, SprintTable, TeamView, Flux) {
    'use strict';

    /** jsx React.DOM */
    function changeTeam(evt) {
        this.setState({
            currentTeam: evt.target.valueAsNumber
        });
    }

    return React.createClass({
        displayName: 'MainContainer',
        childContextTypes: {
            flux: React.PropTypes.any
        },
        getInitialState: function () {
            this.flux = new Flux();
            this.flux.dispatcher.registerEventsHandled(this.forceUpdate);
            return {
                currentTeam: this.props.currentTeam
            };
        },
        getChildContext: function () {
            return {
                flux: this.flux
            };
        },
        render: function () {
            return (
                <div>
                    <h1>Scrum Board</h1>

                    <h2>Team: {this.state.currentTeam}</h2>

                    <div className="backlog">
                        <input type='number' value={this.state.currentTeam} onChange={changeTeam.bind(this)}/>
                        <Backlog teamId={this.state.currentTeam}/>
                    </div>
                    <div className="team-view">
                        <TeamView />
                    </div>
                </div>);
        }
    });
});
