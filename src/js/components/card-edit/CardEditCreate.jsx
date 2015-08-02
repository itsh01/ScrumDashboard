define([
        'lodash',
        'React',
        'components/card-edit/Btn'
    ],
    function (_, React, Btn) {
        'use strict';

        return React.createClass({
            displayName: 'CardEditCreate',

            propTypes: {
                card: React.PropTypes.object,
                isCreating: React.PropTypes.bool.isRequired,
                isPop: React.PropTypes.bool.isRequired
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
                    var cardObj = this.context.flux.planningStore.getBlankCard();
                    return cardObj.card;
                }
                return _.cloneDeep(this.props.card);
            },


            keysFilter: function (key) {
                return (
                    key !== 'id' &&
                    key !== 'team' &&
                    key !== 'assignee'
                );
            },

            makeInputElement: function (key) {
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
                    <option selected disabled>Choose {stateKey}</option>
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
                var teams = this.context.flux.teamsStore.getAllTeams();
                var content = (
                    <div className='card-edit-container'>
                        {this.contentFactory()}

                        {this.getSelectOptions(teams, 'team')}
                        {this.getSelectOptions(this.getMembersIdList(), 'assignee')}

                        <div>
                            <input type='checkbox'>Assign to All</input>
                        </div>
                        <Btn card={this.state} isCreating={this.props.isCreating}/>

                    </div>
                );
                content = this.props.isPop ? (
                    <div className='pop'>
                        {content}
                    </div>
                ) : content;
                return (
                    <div>
                        {content}
                    </div>
                );
            }
        });
    });