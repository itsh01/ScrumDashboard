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
                card: React.PropTypes.object,
                isCreating: React.PropTypes.bool
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getDefaultProps: function () {
                return {
                    isCreating: true
                };
            },

            getInitialState: function () {
                if (!this.props.isCreating && !this.props.card) {
                    throw new Error();
                }
                if (this.props.isCreating) {
                    return this.context.flux.cardsStore.getBlankCard();
                }
                return _.cloneDeep(this.props.card);
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
                return _.chain(['name', 'description'])
                    .filter(this.keysFilter)
                    .map(this.makeTextInputElement).value();
            },

            handleSelectChange: function (stateKey, e) {
                var obj = {};
                obj[stateKey] = e.target.value;
                if (stateKey === 'score') {
                    obj[stateKey] = parseInt(e.target.value);
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
                return (<select onChange={this.handleSelectChange.bind(this, stateKey)}>
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
                var team = this.context.flux.teamsStore.getTeamById(this.state.team);
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
                        {this.getTextInputFields()}

                        {this.getSelectBoxes()}

                        <CardEditButtons card={this.state} isCreating={this.props.isCreating}/>

                    </div>
                );
            }
        });
    });

//<!--<div> TODO add this
//    <input type='checkbox'>Assign to All</input>
//</div>-->