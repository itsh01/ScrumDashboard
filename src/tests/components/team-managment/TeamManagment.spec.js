define(['React', 'components/team-management/TeamManagement', 'stubContext', 'stores/flux'],
    function (React, TeamManagement, stubContext, Flux) {
        'use strict';
        console.log(stubContext);
        //var mockTeam = {
        //    members: ['1234']
        //};
        //var mockMember = {name: 'shlomo', id: '1234'};
        var reactTestUtils = React.addons.TestUtils;
        describe('Team management tests', function () {
            beforeEach(function () {

                //spyOn(TeamManagement.prototype.context, '').and.returnValue(mockTeam);
                var flux = new Flux();
                var TeamManagementWithContext = stubContext(TeamManagement, {flux: flux});
                //spyOn(TeamManagement.prototype, 'getCurrentTeam').and.returnValue(mockTeam);
                var instance = React.createElement(TeamManagementWithContext, {});
                reactTestUtils.renderIntoDocument(instance);

                //spyOn(teamComp.context.flux.membersStore, 'getMemberById').and.returnValue(mockMember);
            });

            //it('should return member', function () {
            //    //var mainComp = reactTestUtils.renderIntoDocument(React.createElement(MainContainer));
            //    //var teamComp = reactTestUtils.renderIntoDocument(React.createElement(TeamManagement));
            //});
        });

    });