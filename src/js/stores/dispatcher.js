define(['lodash'], function (_) {
    'use strict';

    function Dispatcher() {
        var registeredActions = {};

        this.registerAction = function (actionName, callback) {
            registeredActions[actionName] = registeredActions[actionName] || [];
            registeredActions[actionName].push(callback);
        };

        this.handlingEvent = false;

        this.registerEventsHandled = function (callback) {
            this.eventsHandled = callback;
        };

        this.fireUpdate = function () {
            this.eventsHandled();
        };

        this.dispatchAction = function () {

            var actionName = [].shift.apply(arguments),
                actionData = arguments,
                wasHandlingEvent = this.handlingEvent;

            this.handlingEvent = true;
            if (registeredActions[actionName]) {
                _.forEach(registeredActions[actionName], function (callback) {
                    callback.apply(null, actionData);
                });
            }
            if (!wasHandlingEvent) {
                this.handlingEvent = false;
                this.fireUpdate();
            }
        };
    }

    return Dispatcher;
});