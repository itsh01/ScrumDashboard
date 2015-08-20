define([
        'React',
        'stubContext',
        'definition!components/backlog/Backlog'

    ],
    function (React, stubContext, BacklogDefinition) {
        'use strict';
        /*eslint-disable*/
        var Backlog = BacklogDefinition(_, React, 'div');

        function initComp(component, mockContext, mockProps) {
            var stubDeclaration = stubContext(component, mockContext);
            var stubElement = React.createElement(stubDeclaration, mockProps);
            var stubRendered = React.addons.TestUtils.renderIntoDocument(stubElement);
            return React.addons.TestUtils.findRenderedComponentWithType(stubRendered, component);
        }
        var mockContext;
        var backlogComp;
        var mockProps;
        describe('backlog:', function () {
            describe('component Backlog', function () {
                beforeEach(function () {
                    window.localStorage.clear();
                    mockContext = {
                        flux: {
                            planningActions: {
                                planningAddCard: function(){}
                            },
                            cardsStore: {
                                getTeamCards: function(){},
                                getCompanyCards: function(){}
                            }
                        }
                    };
                    mockProps = {teamId: '2d2d8f82-0b6a-404a-9c08-929cfe3de079'};
                    backlogComp = initComp(Backlog, mockContext, mockProps);



                    spyOn(backlogComp.context.flux.cardsStore, 'getTeamCards').and.returnValue([{
                        "id": "b97fff13-de90-4e1f-abb7-39f786d11450",
                        "name": "connect solid state hard drive",
                        "description": "You can't hack the alarm without bypassing the multi-byte SDD alarm!",
                        "status": "In progress",
                        "score": 3,
                        "team": "2d2d8f82-0b6a-404a-9c08-929cfe3de079",
                        "assignee": '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                        "startDate": '2015-08-23',
                        "endDate": ''
                    }]);
                    spyOn(backlogComp.context.flux.cardsStore, 'getCompanyCards').and.returnValue([{
                        "id": "90eed4aa-40fe-496e-999a-54a436d66427",
                        "name": "hack digital protocol",
                        "description": "I'll compress the digital EXE protocol, that should protocol the EXE protocol!",
                        "status": "unassigned",
                        "score": 1,
                        "team": '',
                        "assignee": '',
                        "startDate": '',
                        "endDate": ''
                    }]);


                    spyOn(backlogComp.context.flux.planningActions, 'planningAddCard').and.returnValue();

                });

                it('should be defined', function () {
                    expect(backlogComp).toBeDefined();
                });

            });


        });

    }
);