define([
        'lodash',
        'React',
        'constants',
        'components/team/ComboBox',
        'moment',
        'DatePicker'
    ],
    function (_, React, constants, ComboBox, moment, DatePicker) {
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
                this.setState( this.fetchState() );
            },

            fetchState: function () {
                var currentSprint = this.context.flux.teamsStore.getCurrentSprint();
                currentSprint.startDate = currentSprint.startDate ? moment(currentSprint.startDate) : moment();
                currentSprint.endDate = currentSprint.endDate ? moment(currentSprint.endDate) : moment();
                return currentSprint;
            },

            teamMemberOptionsBox: function () {
                var flux = this.context.flux,
                    teamMembers = flux.teamsStore.getCurrentTeam().members,
                    options = _(teamMembers)
                        .map(function (memberId) {
                            return flux.membersStore.getMemberById(memberId);
                        })
                        .map(function (member) {
                            return (<option
                                value={member.id}
                                key={member.id}>
                                {member.name}
                            </option>);
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

            updateSprint: function (data) {
                var sprintData = _.cloneDeep(data || this.state),
                    teamsStore = this.context.flux.teamsStore;
                delete sprintData.id;

                sprintData.startDate = this.formatDate(sprintData.startDate);
                sprintData.endDate = this.formatDate(sprintData.endDate);


                this.context.flux.dispatcher.dispatchAction(
                    constants.actionNames.UPDATE_SPRINT,
                    this.state.id,
                    sprintData,
                    teamsStore.getCurrentTeam().id
                );

            },
            toggleTeamMember: function (memberId) {
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
                        return (<label
                            key={member.id}>
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

            getFieldWrapper: function (text, fields) {

                return (
                    <div className='input-section'>
                        <div className='input-section-label'>
                            <span>{text}</span>
                        </div>
                        <div className='input-section-field'>
                            {fields}
                        </div>
                    </div>
                );
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

            formatDate: function (rawDate) {
                var formattedDate = moment(rawDate);
                formattedDate.locale('en');
                return formattedDate.format('YYYY-MM-DD');
            },

            changeStartDate: function (newStartDate) {
                var sprintData = _.cloneDeep(this.state);

                sprintData.startDate = newStartDate.format('YYYY-MM-DD');
                sprintData.endDate = this.formatDate(sprintData.endDate);

                this.updateSprint(sprintData);
            },
            changeEndDate: function (newEndDate) {
                var sprintData = _.cloneDeep(this.state);

                sprintData.endDate = newEndDate.format('YYYY-MM-DD');
                sprintData.startDate = this.formatDate(sprintData.startDate);

                this.updateSprint(sprintData);
            },
            render: function () {
                return (
                    <div className="edit-sprint" onKeyUp={this.listenForStateChange}>
                        {this.getFieldWrapper('Sprint Name:', <input type='text'
                                                                     valueLink={this.linkState('name')}></input>)}
                        {this.getFieldWrapper('Scrum Master:', this.teamMemberOptionsBox())}
                        {this.getFieldWrapper('Select Sprint Members:', this.teamMembersCheckBoxes())}
                        {this.getFieldWrapper('Start Date:', <DatePicker
                            selected={this.state.startDate}
                            onChange={this.changeStartDate}
                            dateFormat="YYYY-MM-DD"/>)}
                        {this.getFieldWrapper('End Date:', <DatePicker
                            selected={this.state.endDate}
                            onChange={this.changeEndDate}
                            dateFormat="YYYY-MM-DD"/>)}
                        {this.getFieldWrapper('Add Phase To Lifecycle', <ComboBox
                            items={this.state.cardLifecycle}
                            handleChange={this.changeLifecycle}/>)}

                    </div>
                );
            }
        });
    }
);
