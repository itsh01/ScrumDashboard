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
                allMembers: React.PropTypes.array,
                card: React.PropTypes.object,
                currSprintMembers: React.PropTypes.any,
                currTeam: React.PropTypes.any,
                isCreating: React.PropTypes.bool,
                sprintLifeCycle: React.PropTypes.any
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getInitialState: function () {
                return _.cloneDeep(this.props.card);
            },

            isCreating: function () {
                return this.props.isCreating;
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
                if (stateKey === 'team' && e.target.value === 'CompanyBacklog') {
                    obj[stateKey] = '';
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
                return (<select
                    value={this.state[stateKey]}
                    onChange={this.handleSelectChange.bind(this, stateKey)}
                    ref={stateKey}>
                    {options}
                </select>);
            },

            getTeamMembersIdList: function () {
                if (!this.state.team) {
                    return null;
                }
                return _.filter(this.props.allMembers, function () {

                });

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

                return this.props.sprintLifeCycle;
            },

            getValidScores: function () {
                return [1, 2, 3, 5, 8, 13];
            },

            getSelectBoxes: function () {
                return (<div>
                    Score: {this.getSelectOptions(this.formatToIdAndName(this.getValidScores()), 'score')}
                    <div>
                        Add Card To {this.getSelectOptions([{
                        id: 'CompanyBacklog',
                        name: 'Company'
                    }, {id: this.props.currTeam.id, name: this.props.currTeam.name}], 'team')} Backlog
                    </div>
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
