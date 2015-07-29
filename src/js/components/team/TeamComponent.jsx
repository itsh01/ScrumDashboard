define(['lodash', 'React', 'components/team/ChangeSprint', 'components/sprint/Table'], function (_, React, ChangeSprint, SprintTable) {
    'use strict';

    return React.createClass({
        displayName: 'TeamView',

        propTypes: {
            currSprint: React.PropTypes.number,
            team: React.PropTypes.object
        },

        getDefaultProps: function () {
            return {
                team: {
                    members: [
                        'cba60761-a30a-4c07-8e3c-1bef60a5d873',
                        '15c893ea-5463-471d-a59e-8acba34fdb66',
                        '63388982-b3b9-479e-9b76-d7a979ad8606',
                        '5a04e20f-9d1d-415d-a0d8-8c45f11aec3c',
                        '09c860d7-7476-4a79-ad62-cca71be1d13c'
                    ],
                    filterFunc: null,
                    id: 'f2ca8b7b-e798-4ed2-aff9-eee3a1aaff61',
                    sprints: [0, 1, 2, 3],
                    name: 'Accounts'
                }
            };
        },

        getInitialState: function () {
            return {
                currSprint: this.props.team.sprints[this.props.team.sprints.length - 1]
            };
        },

        handleSprintChange: function (direction) {
            if (direction === 'backwards' && this.state.currSprint > 0) {
                this.setState({currSprint: this.state.currSprint - 1});
            } else if (direction === 'forward' && this.state.currSprint < this.props.team.sprints.length - 1) {
                this.setState({currSprint: this.state.currSprint + 1});
            }
        },

        render: function () {
            return (<div>
                <h1>{this.props.team.name} Team</h1>
                <h2>Scrum DashBoard</h2>

                <div className="sprint-container">
                    <ChangeSprint direction='backwards'
                                  handleSprintChangeFunc={this.handleSprintChange.bind(this, 'backwards')}/>
                    <span>{this.state.currSprint}</span>
                    <SprintTable />
                    <ChangeSprint direction='forward'
                                  handleSprintChangeFunc={this.handleSprintChange.bind(this, 'forward')}/>
                </div>

                <button>Manage Team</button>
            </div>);
        }
    });


});


//<BackLog team=""/>
//<Sprint team=""/>