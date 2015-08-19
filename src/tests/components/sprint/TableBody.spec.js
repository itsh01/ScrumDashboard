///**
// * Created by itaysh on 8/12/15.
// */
//define([
//        'lodash',
//        'React',
//        'components/sprint/TableBody',
//        'stubContext',
//        'flux/flux'
//    ],
//    function (_, React, TableBody, stubContext, Flux) {
//        'use strict';
//
//        var mockProps = {
//            sprint: {
//                id: '55b8a160-69c3-c3bc-d542-5303e41ce41c',
//                name: 'R2D2',
//                scrumMaster: 'c2ea9955-081c-4da5-8bc7-be27e1a19c6e',
//                startDate: null,
//                endDate: null,
//                cardLifecycle: ['Backlog', 'In progress', 'Done'],
//                members: [
//                    '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                    'b6cec5a4-9055-4a3d-9cee-e86b2e338645',
//                    'c2ea9955-081c-4da5-8bc7-be27e1a19c6e',
//                    '061804a2-1f93-40e1-bf49-57b82e5b568b'
//                ],
//                state: 1,
//                retroCardsStatus: null
//            }
//        };
//        var TableBodyWithContext = null;
//
//        describe('Table Body', function () {
//
//            var instance = null;
//            var renderedInstance = null;
//
//            beforeEach(function () {
//
//                window.localStorage.clear();
//
//
//                TableBodyWithContext = stubContext(TableBody, {flux: new Flux()});
//
//
//                instance = React.createElement(TableBodyWithContext, mockProps);
//                renderedInstance = React.addons.TestUtils.renderIntoDocument(instance);
//
//            });
//
//            it('should use create table rows as the amount of sprint members', function () {
//                var tableRowsAmount = renderedInstance
//                    .getDOMNode()
//                    .querySelectorAll('.table-row')
//                    .length;
//
//                expect(tableRowsAmount).toEqual(mockProps.sprint.members.length);
//
//            });
//
//        });
//    }
//);