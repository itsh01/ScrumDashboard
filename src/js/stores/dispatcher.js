define(['lodash'], function (_) {
    'use strict';

    function Dispatcher(stores) {
        var storeCallbacks = _.map(stores, function (storeCallback) {
            return storeCallback.handleAction;
        });
        this.handlingEvent = false;

        this.registerEventsHandled = function (callback) {
            this.eventsHandled = callback;
        };

        this.fireUpdate = function () {
            this.eventsHandled();
        };

        this.dispatchAction = function (actionName, actionData) {
            var wasHandlingEvent = this.handlingEvent;
            this.handlingEvent = true;
            storeCallbacks.forEach(function (cb) {
                cb(actionName, actionData);
            });
            if (!wasHandlingEvent) {
                this.handlingEvent = false;
                this.fireUpdate();
            }
        };
    }

    return Dispatcher;
});