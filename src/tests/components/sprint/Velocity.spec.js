///**
// * Created by itaysh on 8/10/15.
// */
//
//define([
//        'lodash',
//        'React',
//
//        'definition!components/sprint/Velocity',
//
//        'stubContext',
//        'flux/flux',
//
//        'mixins/HistoryMixin',
//
//        'constants'
//    ],
//    function (_, React, velocityDefinition, stubContext, Flux, HistoryMixin, constants) {
//        'use strict';
//
//        var mockProps = {
//            cardLifecycle: ['Backlog', 'In progress', 'QA', 'Done'],
//            sprintMembers: [
//                '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
//                '061804a2-1f93-40e1-bf49-57b82e5b568b'
//            ],
//            sprintStatus: constants.SPRINT_STATUS.RETRO,
//            retro: [
//                {
//                    cardId: 'b97fff13-de90-4e1f-abb7-39f786d11450',
//                    assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                    status: 'In progress'
//                },
//                {
//                    cardId: '90eed4aa-40fe-496e-999a-54a436d66427',
//                    assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                    status: 'Done'
//                },
//                {
//                    cardId: '4796b5fd-1d11-4c2b-bdd3-d36796bb65ed',
//                    assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                    status: 'Done'
//                },
//                {
//                    cardId: 'e9c3f04d-8796-4249-8a4f-bba085ab0271',
//                    assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                    status: 'Done'
//                }
//            ]
//        };
//
//        var mockCards = [
//            {
//                id: 'b97fff13-de90-4e1f-abb7-39f786d11450',
//                name: 'connect solid state hard drive',
//                description: 'You can\'t hack the alarm without bypassing the multi-byte SDD alarm!',
//                status: 'In progress',
//                score: 3,
//                team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
//                assignee: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                startDate: null,
//                endDate: null
//            },
//            {
//                id: '90eed4aa-40fe-496e-999a-54a436d66427',
//                name: 'hack digital protocol',
//                description: '\'ll compress the digital EXE protocol, that should protocol the EXE protocol!',
//                status: 'Done',
//                score: 1,
//                team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
//                assignee: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                startDate: null,
//                endDate: null
//            },
//            {
//                id: 'eaf1abfe-639f-4a8b-8e02-add0acc9833a',
//                name: 'quantify open-source microchip',
//                description: 'The TCP driver is down, bypass the 1080p driver so we can bypass the TCP driver!',
//                status: 'Done',
//                score: 3,
//                team: '2d2d8f82-0b6a-404a-9c08-929cfe3de079',
//                assignee: '061804a2-1f93-40e1-bf49-57b82e5b568b',
//                startDate: null,
//                endDate: null
//            }
//        ];
//
//        var Velocity = null;
//        var VelocityWithContext = null;
//
//        describe('Sprint Velocity', function () {
//
//            var instance = null;
//
//            beforeEach(function () {
//
//                spyOn(HistoryMixin, 'mapHistoryToCards').and.returnValue(mockCards);
//
//                Velocity = velocityDefinition(_, React, HistoryMixin, constants);
//
//                VelocityWithContext = stubContext(Velocity, {flux: new Flux()});
//                instance = React.createElement(VelocityWithContext, {});
//                React.addons.TestUtils.renderIntoDocument(instance);
//
//
//            });
//
//            it('should calculate expected velocity', function () {
//                expect(Velocity.prototype.calcExpectedVelocity(mockCards)).toEqual(7);
//            });
//
//            it('should calculate actual velocity', function () {
//                var lastPhase = _.last(mockProps.cardLifecycle);
//                expect(Velocity.prototype.calcActualVelocity(mockCards, lastPhase)).toEqual(4);
//            });
//
//            it('should use retro cards when locked state provided', function () {
//
//                instance = React.createElement(VelocityWithContext, mockProps);
//                React.addons.TestUtils.renderIntoDocument(instance);
//
//                expect(HistoryMixin.mapHistoryToCards).toHaveBeenCalled();
//
//            });
//
//        });
//    }
//);