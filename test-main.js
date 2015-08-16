var tests = [];
for (var file in window.__karma__.files) {
  if (/spec\.js$/.test(file)) {
    console.log(file);
    tests.push(file);
  }
}


requirejs.config({
  baseUrl: '/base/src/js',
  paths: {
    lodash: '../vendor/lodash',
    React: '../vendor/react-with-addons',
    DragDropMixin: '../vendor/DragDropMixin',
    DatePicker: '../vendor/DatePicker',
    eventemitter2: '../vendor/eventemitter2',
    components: '../js/components',
    mixins: '../js/mixins',
    general: '../js/general',
    stores: '../js/stores',
    flux: '../js/stores/refactor/Flux',
    stubContext: '../vendor/stubContext',
    definition: '../js/plugins/definition/src/main/definition',
    baseFlux: '../js/stores/refactor/baseFlux',

    // DatePicker dependencies

    tether: '../vendor/tether',
    moment: '../vendor/moment',
    'react-onclickoutside': '../vendor/react-onclickoutside'
  },
  map: {
    '*': {
      react: 'React'
    }

  },
  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start,
  shim: {
    lodash: {
      exports: '_'
    },
    React: {
      exports: 'React'
    },
    flux: {
      exports: 'flux'
    },
    eventemitter2: {
      exports: 'eventemitter2'
    },
    stubContext:{
      deps: ['react'],
      exports: 'stubContext'
    }

  }
});
