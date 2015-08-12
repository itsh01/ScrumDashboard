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
                localStorage.clear();
                var flux = new Flux();
                var TeamManagementWithContext = stubContext(TeamManagement, {flux: flux});
                var instance = React.createElement(TeamManagementWithContext, {});
                reactTestUtils.renderIntoDocument(instance);

            });

            it('should return member', function () {
                //var mainComp = reactTestUtils.renderIntoDocument(React.createElement(MainContainer));
                //var teamComp = reactTestUtils.renderIntoDocument(React.createElement(TeamManagement));
            });
        });

    });