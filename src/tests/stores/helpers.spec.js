define(['stores/helpers'], function (helpers) {
    'use strict';

    describe('saveToLocalStorage.js', function () {
        it('should save to local storage ', function () {
            window.localStorage.clear();
            var mockObj = {a: 1, b: 2};
            var mockStoreName = 'checkstore';
            helpers.saveToLocalStorage(mockStoreName, mockObj);
            var restoredObj = helpers.restoreFromLocalStorage(mockStoreName);

            expect(JSON.stringify(mockObj)).toBe(JSON.stringify(restoredObj));
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

    describe('isValidValue', function () {
        var schema = {
            name: {type: 'string'},
            description: {type: 'string', defaultValue: ''},
            score: {type: 'number', defaultValue: null},
            team: {type: 'string', defaultValue: null},
            status: {type: 'string', defaultValue: 'unassigned'},
            assignee: {type: 'string', defaultValue: null},
            startDate: {type: 'string', defaultValue: null},
            endDate: {type: 'string', defaultValue: null}
        };

        it('should return true on valid value for key', function () {
            var value = 'someName';
            var key = 'name';
            expect(helpers.isValidValue(value, key, schema)).toEqual(true);
        });
        it('should return false on invalid value for key without defined default value', function () {
            var value = '';
            var key = 'name';
            expect(helpers.isValidValue(value, key, schema)).toEqual(false);
        });


        it('should return true on valid value for key', function () {
            var value = '2015-10-10';
            var key = 'startDate';
            expect(helpers.isValidValue(value, key, schema)).toEqual(true);
        });
        it('should return false on invalid date format', function () {
            var value = '22/12/2015';
            var key = 'startDate';
            expect(helpers.isValidValue(value, key, schema)).toEqual(false);
        });

        it('should return true on empty value if there exists default value for field', function () {
            var value = null;
            var key = 'assignee';
            expect(helpers.isValidValue(value, key, schema)).toEqual(true);
        });
    });

});