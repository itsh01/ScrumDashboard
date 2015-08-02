define(
    [
        '../../src/vendor/lodash',
        './test'
    ],
    function (_,
              Test) {
        'use strict';

        (function Test() {
            this.test = new Test();
            var ids = this.test.cardsStore.testAdd();
            this.test.cardsStore.testUpdate(ids);
            this.test.cardsStore.testRemove(ids);

        })();
    });