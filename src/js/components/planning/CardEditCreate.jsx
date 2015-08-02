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
                        this.card
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

            makeInputElement: function (key) {
                return (<div className='card-edit-field-container'>
                    <div className='card-edit-label'>
                        <span >{key}</span>
                    </div>
                    <div className='card-edit-input-text'>
                        <input type='text' valueLink={this.linkState(key)}></input>
                    </div>
                </div>);
            },

            contentFactory: function () {
                return _.chain(this.state)
                    .keys()
                    .filter(this.keysFilter)
                    .map(this.makeInputElement).value();
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
                var btnSaveDel = 'card-edit-btn card-edit-btn-'+ (saveDelTxt.toLowerCase());
                return (
                    <div className='card-edit-container'>
                        {this.contentFactory()}

                        {this.getSelectOptions(teams, 'team')}
                        {this.getSelectOptions(this.getMembersIdList(), 'assignee')}

                        <div>
                            <input type='checkbox'>Assign to All</input>
                        </div>

                        <div className='card-edit-btn-container'>
                            <button className='card-edit-btn card-edit-btn-cancel'>Cancel</button>
                            <button className={btnSaveDel} onClick={this.saveOrDeleteCard}>{saveDelTxt}</button>
                        </div>
                    </div>
                );
            }
        });
    });