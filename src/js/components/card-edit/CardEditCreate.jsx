define([
        'lodash',
        'React',
        'components/card-edit/CardEditCreateButtons',
        'components/pop-up/Basic'
    ],
    function (_, React, CardEditButtons) {
        'use strict';

        return React.createClass({
            displayName: 'CardEditCreate',

            propTypes: {
                card: React.PropTypes.object
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],


            getInitialState: function () {
                var card;
                if (this.isCreating()) {
                    card = this.context.flux.cardsStore.getBlankCard();
                } else if (!this.props.card) {
                    card = this.context.flux.planningStore.getCurrentCard();
                } else {
                    card = _.cloneDeep(this.props.card);
                }
                return card;
            },

            isCreating: function () {
                return !this.context.flux.planningStore.getCurrentCard();
            },

            makeTextInputElement: function (key) {
                return (
                    <div className='card-edit-field-container'>
                        <div className='card-edit-label'>
                            <span >{key}</span>
                        </div>
                        <div className='card-edit-input-text'>
                            <input type='text' valueLink={this.linkState(key)}></input>
                        </div>
                    </div>
                );
            },
            getTextInputFields: function () {
                var keys = ['name', 'description'];
                return _.map(keys, this.makeTextInputElement);
            },

            handleSelectChange: function (stateKey, e) {
                var obj = {};
                obj[stateKey] = e.target.value;
                if (stateKey === 'score') {
                    obj[stateKey] = parseInt(e.target.value, 10);
                }
                this.setState(obj);
            },

            getSelectOptions: function (values, stateKey) {
                if (!values || values.length === 0) {
                    return null;
                }
                var options = _.map(values, function (value) {
                    return (<option value={value.id}>{value.name}</option>);
                });
                return (<select value={this.state[stateKey]} onChange={this.handleSelectChange.bind(this, stateKey)}>
                    <option selected disabled>Choose {stateKey}</option>
                    {options}
                </select>);
            },

            getTeamMembersIdList: function () {
                if (!this.state.team) {
                    return null;
                }
                var team = this.context.flux.teamsStore.getTeamById(this.state.team);
                var sprintMembers = team.sprints[team.sprints.length - 1].members;
                return this.context.flux.membersStore.getMembersByIdList(sprintMembers);
            },

            formatToIdAndName: function (arr) { //TODO change this name?
                return _.map(arr, function (status) {
                    return {id: status, name: status};
                });
            },

            getLifecycleOptions: function () {
                if (!this.state.assignee) {
                    return null;
                }
                if (!this.state.team) {
                    throw new Error('INVALID STATE ON THE SYSTEM: card has assignee but not team!!! id: ' + this.state.id);
                }
                var team = this.context.flux.teamStore.getTeamById(this.state.team);
                return team.sprints[team.sprints.length - 1].cardLifecycle;
            },

            getValidScores: function () {
                return [1, 2, 3, 5, 8, 13, 21, 34, 55];
            },

            getSelectBoxes: function () {
                var teams = this.context.flux.teamsStore.getAllTeams();
                return (<div>
                    {this.getSelectOptions(this.formatToIdAndName(this.getValidScores()), 'score')}
                    <div>
                        {this.getSelectOptions(teams, 'team')}
                        {this.getSelectOptions(this.getTeamMembersIdList(), 'assignee')}
                    </div>
                    {this.getSelectOptions(this.formatToIdAndName(this.getLifecycleOptions()), 'status')}
                </div>);
            },

            render: function () {
                return (
                    <div className='card-edit-container'>
                        <h2 style={{marginTop: '0'}}>{this.isCreating() ? 'New Card' : 'Editing'}</h2>
                        {this.getTextInputFields()}

                        {this.getSelectBoxes()}

                        <CardEditButtons card={this.state} isCreating={this.isCreating()}/>

                    </div>
                );
            }
        });
    });
