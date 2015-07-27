/**
 * Created by itaysh on 7/27/15.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        lodash: 'vendor/lodash',
        React: 'vendor/react-with-addons'
    },
    shim: {
        lodash: {
            exports: '_'
        },
        React: {
            exports: 'React'
        }
    }
});

requirejs(['lodash','React'],function (_, React) {

});