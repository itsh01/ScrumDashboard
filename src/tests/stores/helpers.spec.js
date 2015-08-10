
'use strict';

define(['stores/helpers'], function (helpers) {

    describe('saveToLocalStorage.js', function () {
        it('should save to local storage ', function () {
            window.localStorage.clear();
            var mockObj = {a:1, b:2};
            var mockStoreName = 'checkstore';
            helpers.saveToLocalStorage(mockStoreName, mockObj);
            var restoredObj = helpers.restoreFromLocalStorage(mockStoreName);

            expect(JSON.stringify(mockObj)).toBe(JSON.stringify(restoredObj));
        });



    describe('generateGuid', function () {
        var GUID_FORMAT = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;

        it('should generate a string', function () {
            var guid = helpers.generateGuid();
            expect(typeof guid === 'string').toBe(true);
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