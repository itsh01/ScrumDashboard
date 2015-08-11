define([
        'react',
        'components/backlog/Backlog'
    ],
    function (React, backlog) {
        'use strict';
        describe('backlog', function () {

            describe('component Backlog', function () {
                it('should  ', function () {
                    var instance = React.createElement(backlog, {teamId: '2d2d8f82-0b6a-404a-9c08-929cfe3de079'});
                    var backlogComp = React.addons.TestUtils.renderIntoDocument(instance);
                    expect(backlogComp.state.loaded).toBeTruthy();
                });

            });

        });

    }
);