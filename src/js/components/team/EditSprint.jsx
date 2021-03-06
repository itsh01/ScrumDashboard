define([
        'lodash',
        'React',
        'constants',
        'components/general/InputWrapper',
        'components/general/ComboBox',
        'moment',
        'DatePicker'
    ],
    function (_, React, constants, InputWrapper, ComboBox, moment, DatePicker) {
        'use strict';

        return React.createClass({
            displayName: 'EditSprint',

            contextTypes: {
                flux: React.PropTypes.any
            },

            mixins: [React.addons.LinkedStateMixin],

            getInitialState: function () {
                return this.fetchState();
            },

            componentWillReceiveProps: function () {
                this.setState(this.fetchState());
            },

            computeEndDate: function (sprint) {
                if (!sprint.endDate) {
                    var now = new Date();
                    now.setDate(now.getDate() + 7);
                    sprint.endDate = moment(now);
                } else {
                    sprint.endDate = moment(sprint.endDate);
                }
            },

            fetchState: function () {
                var currentSprint = this.context.flux.teamsStore.getCurrentSprint();
                currentSprint.startDate = currentSprint.startDate ? moment(currentSprint.startDate) : moment();
                this.computeEndDate(currentSprint);
                return currentSprint;
            },

            teamMemberOptionsBox: function () {
                var flux = this.context.flux,
                    teamMembers = flux.teamsStore.getCurrentTeam().members,
                    sprintMembers = this.context.flux.teamsStore.getCurrentSprint().members,
                    options = _(teamMembers)
                        .map(function (memberId) {
                            return flux.membersStore.getMemberById(memberId);
                        })
                        .map(function (member) {
                            if (!member || !_.includes(sprintMembers, member.id)) {
                                return null;
                            }
                            return (
                                <option
                                    className="option-base-text-color"
                                    value={member.id}
                                    key={member.id}>
                                    {member.name}
                                </option>
                            );
                        })
                        .value();

                return (<select onChange={this.changeScrumMaster} value={this.state.scrumMaster}>
                    <option value={null} disabled>-</option>
                    {options}
                </select>);
            },

            changeScrumMaster: function (e) {
                this.setState({scrumMaster: e.target.value}, this.updateSprint);
            },


            formatDate: function (rawDate) {
                var formattedDate = moment(rawDate);
                formattedDate.locale('en');
                return formattedDate.format(constants.DATE_FORMAT);
            },

            updateSprint: function (data) {
                var sprintData = _.cloneDeep(data || this.state),
                    teamsStore = this.context.flux.teamsStore;
                delete sprintData.id;

                sprintData.startDate = this.formatDate(sprintData.startDate);
                sprintData.endDate = this.formatDate(sprintData.endDate);


                this.context.flux.teamsActions.updateSprint(
                    this.state.id,
                    sprintData,
                    teamsStore.getCurrentTeam().id
                );

            },
            toggleTeamMember: function (memberId) {
                this.state.members = this.state.members || [];
                var members = this.state.members;

                if (_.includes(members, memberId)) {
                    _.remove(members, function (currentMember) {
                        return currentMember === memberId;
                    });
                } else {
                    members.push(memberId);
                }

                this.updateSprint();
            },

            teamMembersCheckBoxes: function () {
                var teamMembers = this.context.flux.teamsStore.getCurrentTeam().members;
                var membersStore = this.context.flux.membersStore;

                return _(teamMembers)
                    .map(function getMemberById(memberId) {
                        return membersStore.getMemberById(memberId);
                    })
                    .map(function mapMemberToInput(member) {
                        member = member || {};
                        return (<label
                            key={member.id}
                            className="input-checkbox">
                            <input
                                checked={_.includes(this.state.members, member.id)}
                                onChange={this.toggleTeamMember.bind(this, member.id)}
                                type='checkbox'
                                >
                            </input>
                            {member.name}
                        </label>);

                    }, this)
                    .value();
            },
            listenForStateChange: function () {
                var currentSprint = this.context.flux.teamsStore.getCurrentSprint();
                if (!_.isEqual(currentSprint, this.state)) {
                    this.updateSprint();
                }
            },
            changeLifecycle: function (newLifecycle) {
                this.setState({cardLifecycle: newLifecycle}, this.updateSprint);
            },


            changeStartDate: function (newStartDate) {
                var sprintData = _.cloneDeep(this.state);

                sprintData.startDate = newStartDate.format(constants.DATE_FORMAT);
                this.updateSprint(sprintData);
            },

            changeEndDate: function (newEndDate) {
                var sprintData = _.cloneDeep(this.state);

                sprintData.endDate = newEndDate.format(constants.DATE_FORMAT);
                this.updateSprint(sprintData);
            },

            render: function () {
                return (
                    <div className="edit-sprint leftline" onKeyUp={this.listenForStateChange}>
                        <InputWrapper
                            text='Sprint Name:'
                            fields={<input
                                type='text'
                                valueLink={this.linkState('name')}/>}/>

                        <InputWrapper
                            text='Scrum Master:'
                            fields={this.teamMemberOptionsBox()}/>

                        <InputWrapper
                            text='Sprint Members:'
                            fields={this.teamMembersCheckBoxes()}/>

                        <InputWrapper
                            text='Start Date:'
                            fields={<DatePicker
                                selected={this.state.startDate}
                                onChange={this.changeStartDate}
                                dateFormat="YYYY-MM-DD"/>}/>

                        <InputWrapper
                            text='End Date:'
                            fields={<DatePicker
                                selected={this.state.endDate}
                                onChange={this.changeEndDate}
                                dateFormat="YYYY-MM-DD"/>}/>

                        <InputWrapper
                            text='Sprint Lifecycle:'
                            fields={<ComboBox
                                items={this.state.cardLifecycle}
                                handleChange={this.changeLifecycle}/>}/>
                    </div>
                );

            }
        });
    }
);
