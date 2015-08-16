define(['React', 'stores/refactor/flux', 'constants', 'stubContext', 'components/team-management/AddNewMember'],
    function (React, Flux, constants, stubContext, AddNewMember) {
        'use strict';
        var comp;
        var flux;

        var reactTestUtils = React.addons.TestUtils;
        var mockProps = {
            team: {
                members: [
                    '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                    '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                    '061804a2-1f93-40e1-bf49-57b82e5b568b',
                    '183323c8-d707-4471-8736-373eba8aaa8c',
                    'aaef53cc-34bd-4d1f-bdda-9bf5e07ca2be'
                ],
                active: true,
                filterFunc: null,
                id: '1f7a4375-e7db-4798-969e-17325acde499',
                sprints: [{
                    id: '55b8a160-3898-9631-e6ac-e41ce41ce41c',
                    name: 'zero calories',
                    scrumMaster: null,
                    startDate: null,
                    endDate: null,
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    members: [
                        '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                        '061804a2-1f93-40e1-bf49-57b82e5b568b'
                    ],
                    state: 2,
                    retroCardsStatus: null
                },
                    {
                        id: '55b8a160-a101-c202-d3b5-88bce41ce41c',
                        name: 'one for all',
                        scrumMaster: null,
                        startDate: null,
                        endDate: null,
                        cardLifecycle: ['Backlog', 'In progress', 'Done', 'Released'],
                        members: [
                            '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                            'aaef53cc-34bd-4d1f-bdda-9bf5e07ca2be'
                        ],
                        state: 2,
                        retroCardsStatus: [{
                            cardId: 'b97fff13-de90-4e1f-abb7-39f786d11450',
                            assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            status: 'In progress'
                        }, {
                            cardId: '90eed4aa-40fe-496e-999a-54a436d66427',
                            assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            status: 'Done'
                        }, {
                            cardId: '4796b5fd-1d11-4c2b-bdd3-d36796bb65ed',
                            assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            status: 'Done'
                        }, {
                            cardId: 'e9c3f04d-8796-4249-8a4f-bba085ab0271',
                            assigneeId: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            status: 'Done'
                        }]
                    },
                    {
                        id: '55b8a160-69c3-c3bc-d542-5303e41ce41c',
                        name: 'R2D2',
                        scrumMaster: 'c2ea9955-081c-4da5-8bc7-be27e1a19c6e',
                        startDate: null,
                        endDate: null,
                        cardLifecycle: ['Backlog', 'In progress', 'Done'],
                        members: [
                            '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                            'b6cec5a4-9055-4a3d-9cee-e86b2e338645',
                            'c2ea9955-081c-4da5-8bc7-be27e1a19c6e',
                            '061804a2-1f93-40e1-bf49-57b82e5b568b'
                        ],
                        state: 1,
                        retroCardsStatus: null
                    }
                ],
                name: 'Directives'
            }
        };
        var mockMember = {
            name: 'shlomo',
            image: 'img/mosh.jpg',
            active: 'true'
        };

        describe('add new member', function () {
            beforeEach(function () {
                localStorage.clear();
                flux = new Flux();
                var AddNewMemberWithContext = stubContext(AddNewMember, {newFlux: flux});
                var instance = React.createElement(AddNewMemberWithContext, mockProps);
                var wrappedElement = reactTestUtils.renderIntoDocument(instance).getWrappedElement();
                comp = reactTestUtils.renderIntoDocument(wrappedElement);
                spyOn(flux.membersActions, 'createMemberIntoTeam').and.callFake(function () {
                });
            });

            it('should call the add member action', function () {

                var form = reactTestUtils.findRenderedDOMComponentWithClass(comp, 'add-new-member').getDOMNode();
                var memberNameInput = comp.refs.memberName.getDOMNode();
                memberNameInput.value = 'shlomo';
                React.addons.TestUtils.Simulate.submit(form);
                expect(flux.membersActions.createMemberIntoTeam).toHaveBeenCalled();
            });

            it('should call the add member action with the mock member', function () {
                var form = reactTestUtils.findRenderedDOMComponentWithClass(comp, 'add-new-member').getDOMNode();
                spyOn(flux.membersStore, 'getBlankMember').and.returnValue(mockMember);
                var memberNameInput = comp.refs.memberName.getDOMNode();
                memberNameInput.value = 'shlomo';
                React.addons.TestUtils.Simulate.submit(form);
                expect(flux.membersActions.createMemberIntoTeam)
                    .toHaveBeenCalledWith(mockMember, mockProps.team.id);
            });

            it('should not call add member function when form is empty', function () {
                var form = reactTestUtils.findRenderedDOMComponentWithClass(comp, 'add-new-member').getDOMNode();
                React.addons.TestUtils.Simulate.submit(form);
                expect(flux.membersActions.createMemberIntoTeam).not.toHaveBeenCalled();
            });

        });
    });