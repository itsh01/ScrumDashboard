define([
        'react',
        'stubContext',
        'components/backlog/Backlog',
        'stores/flux'
    ],
    function (React, stubContext, Backlog, Flux) {
        'use strict';
        describe('backlog', function () {


            describe('component Backlog', function () {
                var BacklogWithContext;

                beforeEach(function () {
                    window.localStorage.clear();

                    BacklogWithContext = stubContext(Backlog, {flux: new Flux()});

                });

                it('should be defined', function () {
                    var instance = React.createElement(BacklogWithContext, {teamId: '2d2d8f82-0b6a-404a-9c08-929cfe3de079'});
                    var backlogComp = React.addons.TestUtils.renderIntoDocument(instance);
                    expect(backlogComp).toBeDefined();
                });

                it('should have 2 cardlists components', function () {

                });
                it('should have a title', function () {

                });
                it('should  something', function () {

                });

            });

        });

    }
);