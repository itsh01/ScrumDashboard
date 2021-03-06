define(['React', 'components/team-management/TeamManagement', 'stubContext', 'flux/flux'],
    function (React, TeamManagement, stubContext, Flux) {
        'use strict';
        var mockTeam = {
            members: ['1234']
        };
        var mockMember = {name: 'shlomo', id: '1234'};
        var reactTestUtils = React.addons.TestUtils;
        describe('Team management tests', function () {
            var comp;

            beforeEach(function () {
                localStorage.clear();
                var flux = new Flux('https://scrum-dashboard-test.firebaseio.com');
                spyOn(flux.teamsStore, 'getCurrentTeam').and.returnValue(mockTeam);
                spyOn(flux.membersStore, 'getMemberById').and.returnValue(mockMember);
                var TeamManagementWithContext = stubContext(TeamManagement, {flux: flux});
                var instance = React.createElement(TeamManagementWithContext, {});
                var wrappedEl = reactTestUtils.renderIntoDocument(instance).getWrappedElement();
                comp = reactTestUtils.renderIntoDocument(wrappedEl);

            });

            it('should return member', function () {
                var actualMembers = comp.getTeamMembers(comp.getCurrentTeam());
                var expectedMembers = [mockMember];
                expect(actualMembers).toEqual(expectedMembers);


            });
        });

    });