//define(['React', 'components/team/HomeView', 'stubContext', 'stores/flux'],
//    function (React, HomeView, stubContext, Flux) {
//        'use strict';
//
//        var reactTestUtils;
//        var flux;
//        var HomeViewWithContext;
//
//        describe('Team management tests', function () {
//
//            beforeEach(function () {
//                reactTestUtils = React.addons.TestUtils;
//                flux = new Flux();
//                HomeViewWithContext = stubContext(HomeView, {flux: flux});
//            });
//
//            it('should check that HomeView did render', function () {
//                var instance = React.createElement(HomeViewWithContext, {});
//                reactTestUtils.renderIntoDocument(instance);
//                expect(instance.state.loaded).toBeTruthy();
//            });
//        });
//
//    });