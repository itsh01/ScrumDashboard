define(
    [
        '../../src/vendor/lodash',
        './cardStoreTest',
        './memberStoreTest',
        './teamStoreTest'
    ],
    function (_,
              cardStoreTest,
              memberStoreTest,
              teamStoreTest) {
        'use strict';

        return {
            run: function () {
                cardStoreTest.run();
                memberStoreTest.run();
                teamStoreTest.run();
            }
        };
    });