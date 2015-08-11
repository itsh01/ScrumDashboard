define(['constants', 'stores/planning'], function (consts, Planning) {
    'use strict';
    describe('planning store', function () {
        /*eslint-disable no-unused-vars*/
        var planningStore;
        /*eslint-enable no-unused-vars*/
        var spyDispatcher;
        beforeEach(function () {

            spyDispatcher = jasmine.createSpyObj('spyDispatcher', ['registerAction']);
            /*eslint-disable no-unused-vars*/
            planningStore = new Planning(spyDispatcher);
            /*eslint-enable no-unused-vars*/


        });

        it('spy should be up and running', function () {
            console.log(spyDispatcher);
            expect(spyDispatcher.registerAction).toBeDefined();
        });

        describe('register actions', function () {
            it('should register add card event', function () {
                expect(spyDispatcher.registerAction).toHaveBeenCalledWith(
                    consts.actionNames.PLANNING_ADD_CARD,
                    jasmine.any(Function)
                );
            });

            it('should register add card event', function () {
                expect(spyDispatcher.registerAction).toHaveBeenCalledWith(
                    consts.actionNames.PLANNING_DONE_ADDING_CARD,
                    jasmine.any(Function)
                );
            });

            it('should register add card event', function () {
                expect(spyDispatcher.registerAction).toHaveBeenCalledWith(
                    consts.actionNames.PLANNING_EDIT_CARD,
                    jasmine.any(Function)
                );
            });
        });

    });
});