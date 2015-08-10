define(['stores/helpers'], function (helpers) {
    'use strict';
    var mockObj = {a: 1, b: 2};
    var mockStoreName = 'checkstore';

    describe('saveToLocalStorage.js', function () {
        it('should save to local storage ', function () {
            window.localStorage.clear();
            helpers.saveToLocalStorage(mockStoreName, mockObj);
            var restoredObj = helpers.restoreFromLocalStorage(mockStoreName);

            expect(JSON.stringify(mockObj)).toBe(JSON.stringify(restoredObj));
        });
    });

    describe('restoreFromLocalStorage', function () {
        it('should retrieve from local storage', function () {
            helpers.saveToLocalStorage(mockStoreName, mockObj);
            expect(helpers.restoreFromLocalStorage(mockStoreName)).toEqual(mockObj);
        });
    });


    describe('generateGuid', function () {
        var GUID_FORMAT = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;

        it('should generate a string', function () {
            var guid = helpers.generateGuid();
            expect(typeof guid).toBe('string');
        });

        it('should generate a guid formatted string', function () {
            var guid = helpers.generateGuid();
            expect(GUID_FORMAT.test(guid)).toBe(true);
        });

        it('should generate different strings', function () {
            var guid1 = helpers.generateGuid(),
                guid2 = helpers.generateGuid();
            expect(guid1).not.toEqual(guid2);
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

    describe('removeFromLocalStorage', function () {
        it('should remove storeName from local storage', function () {

            localStorage.setItem('blah', 1);
            helpers.removeFromLocalStorage('blah');
            var actualResult = localStorage.getItem('blah');
            expect(actualResult).toBeNull();

        });

        it('should return undefined in case storeName does not exist in local storage', function () {
            var actualResult = helpers.removeFromLocalStorage('blah');
            expect(actualResult).not.toBeDefined();
        });
    });
});