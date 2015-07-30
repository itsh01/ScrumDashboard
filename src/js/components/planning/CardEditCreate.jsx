define([
        'lodash',
        'React'],
    function (_,
              React) {
        'use strict';

        return React.createClass({
            displayName: 'CardEditCreate',

            propTypes: {
                card: React.PropTypes.object,
                isCreating: React.PropTypes.bool.isRequired
            },
            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getInitialState: function () {
                if (!this.props.isCreating && !this.props.card) {
                    throw new Error();
                }
                if (this.props.isCreating) {
                    return this.context.flux.planningStore.getBlankCard();
                }
                return _.cloneDeep(this.props.card);
            },

            saveOrDeleteCard: function () {
                var dispatcher = this.context.flux.dispatcher;
                if (this.props.isCreating) {
                    dispatcher.dispatchAction(
                        'PLANNING_ADD_CARD',
                        {
                            name: this.state.name
                        }
                    );
                    //} else {
                    //
                }
            },
            keysFilter: function (key) {
                return (
                    key !== 'id' &&
                    key !== 'team' &&
                    key !== 'assignee'
                );
            },
            makeElement: function (key) {
                return (<div>
                    <span>{key}</span>
                    <input type='text' valueLink={this.linkState(key)}></input>
                </div>);
            },

            contentFactory: function () {
                return _.chain(this.state)
                    .keys()
                    .filter(this.keysFilter)
                    .map(this.makeElement).value();
            },

            handleSelectChange: function (stateKey, e) {
                var obj = {};
                obj[stateKey] = e.target.value;
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
                    {options}
                </select>);
            },

            getMembersIdList: function () {
                if (!this.state.team) {
                    return null;
                }
                var team = this.context.flux.teamsStore.getTeamById(this.state.team);
                return this.context.flux.membersStore.getMembersByIdList(team.members);
            },
            render: function () {
                var saveDelTxt = this.props.isCreating ? 'Save' : 'Delete';
                var teams = this.context.flux.teamsStore.getAllTeams();
                return (
                    <div>
                        {this.contentFactory()}

                        {this.getSelectOptions(teams, 'team')}
                        {this.getSelectOptions(this.getMembersIdList(), 'assignee')}

                        <input type='checkbox'>Assign to All</input>
                        <button>Cancel</button>
                        <button onClick={this.saveOrDeleteCard}>{saveDelTxt}</button>
                    </div>
                );
            }
        });
    });