define(['lodash'], function (_) {
    'use strict';
    var DATE_FORMAT = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

    function saveToLocalStorage(storeName, storeObj) {
        localStorage.setItem(storeName, JSON.stringify(storeObj));
    }

    function restoreFromLocalStorage(storeName) {
        var localStorageMembers = localStorage.getItem(storeName);
        return localStorageMembers !== 'undefined' ? JSON.parse(localStorageMembers) : undefined;
    }

    function removeFromLocalStorage(storeName) {
        localStorage.removeItem(storeName);
    }

    function generateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function isValidValue(value, key, schema, storeName) {
        if (schema[key] === undefined) {
            console.log(storeName, ': unknown key encountered: ', key, ' ( value: ', value, ')');
            return false;
        }
        if (!value && schema[key].defaultValue === undefined) {
            console.log(storeName, ': key (', key, ') was required but not provided');
            return false;
        }
        if ((key === 'startDate' || key === 'endDate') && typeof value === 'string') {
            if (!DATE_FORMAT.test(value)) {
                console.log(storeName, ': invalid date format:', value, '( must be: YYYY-MM-DD)');
                return false;
            }
        }
        if (schema[key].type === 'array') {
            if (!_.isArray(value)) {
                console.log(storeName, ': invalid value encountered: key', key, ' (array expected)');
                return false;
            }
            return true;
        }
        if (schema[key].type === 'string-array') {
            if (!isStringArray(value)) {
                console.log(storeName, ': invalid value encountered: key', key, ' (strings array expected)');
                return false;
            }
            return true;
        }
        if (typeof value !== schema[key].type && value !== schema[key].defaultValue) {
            console.log(storeName, ': invalid value encountered:', value, '( key:', key, ')');
            return false;
        }
        return true;
    }

    function getBlankItem(schema) {
        //return _.assign({}, schema, function (objectValue, sourceValue) {
        //    return sourceValue.defaultValue === undefined ? '' : sourceValue.defaultValue;
        //    //return sourceValue.defaultValue;
        //});
        var blankItem = {};
        _.forOwn(schema, function (data, dataField) {
            if (data.defaultValue !== undefined) {
                blankItem[dataField] = data.defaultValue;
            }
        });
        return blankItem;
    }

    function isStringArray(arr) {
        return _.every(arr, function (value) {
            return typeof value === 'string';
        });
    }

    function updateItem(collection, itemId, newItemData, storeName) {
        var item = _.find(collection, {id: itemId});
        if (item === undefined) {
            console.log(storeName, ': attempt to update non existent item (id:', itemId, ')');
            return false;
        }
        newItemData = _.cloneDeep(newItemData);
        _.forEach(newItemData, function (value, key) {
            item[key] = newItemData[key];
        });
        return true;
    }

    return {
        saveToLocalStorage: saveToLocalStorage,
        restoreFromLocalStorage: restoreFromLocalStorage,
        removeFromLocalStorage: removeFromLocalStorage,
        generateGuid: generateGuid,
        isValidValue: isValidValue,
        getBlankItem: getBlankItem,
        updateItem: updateItem
    };
})
;

