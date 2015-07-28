/**
 * Created by itaysh on 7/27/15.
 */


define(['lodash', 'React', './backlog/Backlog', 'components/sprint/Table', 'components/team/TeamComponent'],
    function (_, React, Backlog, SprintTable, TeamView) {

        'use strict';

        /** jsx React.DOM */
        var cardsList = [
            {
                id: '7d6f4051-64cb-4a49-aa58-168c4e8358c3',
                name: 'input virtual hard drive',
                description: 'I\'ll generate th mobile JSON panel, that should panel the JSON panel!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'a91402b2-5ba5-4646-a0e5-b54d1e9e031a',
                name: 'quantify redundant array',
                description: 'If we compress the bus, we can get to the JSON bus through the auxiliary JSON bus!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: '27fd6832-d835-4bdc-b7af-612d95c5dfef',
                name: 'hack solid state sensor',
                description: 'If we override the alarm, we can get to the SMS alarm through the optical SMS alarm!',
                status: 'unassigned',
                score: null,
                team: 2,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'ed3a77a6-8db4-4f5e-b95f-1f83372f343c',
                name: 'generate mobile alarm',
                description: 'The AI card is down, generate the mobile card so we can generate the AI card!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'd2798f20-5a5c-461e-8cfc-d65a6643bac4',
                name: 'override primary microchip',
                description: 'I\'ll compress the 1080p SAS driver, that should driver the SAS driver!',
                status: 'unassigned',
                score: null,
                team: null,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: '0c2ad5c7-e4ef-474d-9a6e-92b07592da26',
                name: 'parse online monitor',
                description: 'You can\'t reboot the alarm without generating the virtual SQL alarm!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'e8bbdefa-3e25-4025-8e4a-c7a9f5ff71c8',
                name: 'program 1080p port',
                description: 'Try to back up the THX transmitter, maybe it will back up the open-source transmitter!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: '99af3920-983a-427f-b420-fae7726cad00',
                name: 'override cross-platform bandwidth',
                description: 'You can\'t generate the alarm without indexing the online AI alarm!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'f541c0d5-842a-4d75-80ba-4714155d3092',
                name: 'program mobile array',
                description: 'The ADP card is down, calculate the back-end card so we can calculate the ADP card!',
                status: 'unassigned',
                score: null,
                team: null,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'd6498474-f1d9-4077-8cd7-1f7596bbc218',
                name: 'reboot cross-platform protocol',
                description: 'Try to quantify the JBOD monitor, maybe it will quantify the solid state monitor!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'ed265f51-456b-43a3-8fd1-f92f815995e1',
                name: 'synthesize bluetooth application',
                description: 'You can\'t transmit the panel without programming the auxiliary SMTP panel!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'b43ff073-9060-4cf2-b246-377a280ef588',
                name: 'calculate solid state port',
                description: 'We need to program the haptic SSL matrix!',
                status: 'unassigned',
                score: null,
                team: null,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: '17f000e5-4bee-4287-a425-eac4252129c4',
                name: 'quantify online port',
                description: 'We need to transmit the neural XSS bus!',
                status: 'unassigned',
                score: null,
                team: null,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: 'a7aa36d3-3dfa-4339-9ebf-12e66ebbeb0d',
                name: 'copy bluetooth system',
                description: 'If we compress the firewall, we can get to the SMS firewall through the 1080p SMS firewall!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            },
            {
                id: '41e418dc-02db-4e33-bf36-4e1d1df4cc15',
                name: 'transmit cross-platform interface',
                description: 'The SMTP capacitor is down, bypass the mobile capacitor so we can bypass the SMTP capacitor!',
                status: 'unassigned',
                score: null,
                team: 1,
                assignee: null,
                startDate: null,
                endDate: null
            }
        ];

        function teamFilterFn(item) {
            return item.team === this.state.currentTeam;
        }

        function changeTeam(evt) {
            this.setState({
                currentTeam: evt.target.valueAsNumber
            });
        }


        return React.createClass({
            displayName: 'MainContainer',
            getInitialState: function () {
                return {
                    currentTeam: this.props.currentTeam
                };
            },
            render: function () {
                return (
                    <div>
                        <h1>Scrum Board</h1>

                        <h2>Team: {this.state.currentTeam}</h2>
                        <input type='number' value={this.state.currentTeam} onChange={changeTeam.bind(this)}/>
                        <Backlog cards={cardsList} teamFilterFn={teamFilterFn.bind(this)}/>
                        <SprintTable />
                        <TeamView />
                    </div>);
            }
        });

    });
