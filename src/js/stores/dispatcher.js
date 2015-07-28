define(['lodash'], function (_) {


    function Dispatcher (stores) {
        var storeCallbacks = _.map(stores, function (storeCallback) {
            return storeCallback.handleAction;
        });

        this.dispatchAction = function (actionName, actionData) {
            storeCallbacks.forEach(function(cb) {
                cb(actionName, actionData);
            });
        }
    }

    return Dispatcher
});