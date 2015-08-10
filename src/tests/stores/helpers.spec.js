define(['stores/helpers'], function (helpers) {
    describe('helpers.js', function () {
        'use strict';
        

        describe('generateGuid', function () {
            var GUID_FORMAT = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

            it('should generate a string', function () {
                var guid = helpers.generateGuid();
                expect(guid).toBeDefined();
            });

            it('should generate a guid formatted string', function () {
                var guid = helpers.generateGuid();
                expect(GUID_FORMAT.test(guid)).toBe(true);
            });

            it('should generate different strings', function () {
                var guid1 = helpers.generateGuid(),
                    guid2 = helpers.generateGuid();
                expect(guid1).not.toBe(guid2);
            });

        });

    });
});