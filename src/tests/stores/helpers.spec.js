
'use strict';

define(['stores/helpers'], function (helpers) {


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


    describe('getBlankItem', function () {
        it('should generate blank item by schema', function () {
            var mockSchema = {
                name: {type: 'string'},
                image: {type: 'string', defaultValue: ''},
                active: {type: 'boolean', defaultValue: true}
            };

            var blankItem = helpers.getBlankItem(mockSchema);

            expect(blankItem.name).toEqual('');
            expect(blankItem.image).toEqual('');
            expect(blankItem.active).toEqual(jasmine.any(Boolean));
        });
    });

});