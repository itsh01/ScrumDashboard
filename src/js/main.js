/**
 * Created by itaysh on 7/27/15.
 */

requirejs.config({
    baseUrl: "../src",
    paths: {
        lodash: "lib/lodash/lodash"
    },
    shim: {
        lodash: {
            exports: "_"
        }
    }
});

requirejs(["lodash"],function (_) {
    console.log(_);
});