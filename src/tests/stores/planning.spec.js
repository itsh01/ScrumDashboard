define(['constants', 'stores/planning'], function (consts, Planning) {
    'use strict';
    describe('planning store', function () {


        describe('register actions', function () {
            /*eslint-disable no-unused-vars*/
            var planningStore;
            /*eslint-enable no-unused-vars*/
            var spyDispatcher;
            beforeEach(function () {

                spyDispatcher = jasmine.createSpyObj('spyDispatcher', ['registerAction']);
                planningStore = new Planning(spyDispatcher);

            });

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

        describe('getters work properly', function () {


            var planningStore;
            var mockDispatcher;
            beforeEach(function () {

                mockDispatcher = {
                    registerAction: function (eventName, callback) {
                        this[eventName] = callback;
                    }
                };

                planningStore = new Planning(mockDispatcher);

            });

            it('should have null as current card as default value', function () {
                expect(planningStore.getCurrentCard()).toBeNull();
            });

            it('should return false for getIsAddingOrEditingCard', function () {
                expect(planningStore.getIsAddingOrEditingCard()).toEqual(false);
            });

            it('should return true for getAddingOrEditingCard', function () {
                mockDispatcher[consts.actionNames.PLANNING_ADD_CARD]();
                expect(planningStore.getIsAddingOrEditingCard()).toEqual(true);
            });

            it('should properly set currentCard', function () {
                mockDispatcher[consts.actionNames.PLANNING_EDIT_CARD]('val');
                expect(planningStore.getCurrentCard()).toEqual('val');
            });
        });


    });
});