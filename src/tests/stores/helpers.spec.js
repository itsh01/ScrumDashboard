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

    describe('isValidValue', function () {
        var mockScheme = {
            name: {type: 'string', defaultValue: 'New Sprint'},
            scrumMaster: {type: 'string', defaultValue: null},
            startDate: {type: 'string', defaultValue: null},
            endDate: {type: 'string', defaultValue: null},
            cardLifecycle: {type: 'string-array', defaultValue: ['Backlog', 'In progress', 'Done']},
            members: {type: 'string-array', defaultValue: []},
            retroCardsStatus: {type: 'object', defaultValue: null},
            state: {type: 'number', defaultValue: 0}
        };

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue('MayaSchuster', 'name', mockScheme);
            expect(result).toBeTruthy();
        });

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue(22, 'name', mockScheme);
            expect(result).toBeFalsy();
        });

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue(['Backlog', 'In progress', 'Done'], 'cardLifecycle', mockScheme);
            expect(result).toBeTruthy();
        });

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue(['Backlog', 235, 'Done'], 'cardLifecycle', mockScheme);
            expect(result).toBeFalsy();
        });

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue('1989-05-27', 'startDate', mockScheme);
            expect(result).toBeTruthy();
        });

        it('should return true if the value is in the scheme and of the right type', function () {
            var result = helpers.isValidValue('19890527', 'endDate', mockScheme);
            expect(result).toBeFalsy();
        });

        it('should return false because the key is not valid in the scheme', function () {
            var result = helpers.isValidValue('garbage', 'notAValidKey', mockScheme);
            expect(result).toBeFalsy();
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