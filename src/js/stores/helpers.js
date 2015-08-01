define([], function () {
    'use strict';
    var DATE_FORMAT = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

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
        // make sure that there are no user defined attributes
        if (schema[key] === undefined) {
            console.log(storeName, ': unknown key encountered: ', key, ' ( value: ', value, ')');
            return false;
        }
        // make sure that all required fields are provided
        // TODO: improve
        if (!value && schema[key].defaultValue === undefined) {
            console.log(storeName, ': key (', key, ') was required but not provided');
            return false;
        }
        // check dates
        if ((key === 'startDate' || key === 'endDate') && typeof value === 'string') {
            if (!DATE_FORMAT.test(value)) {
                console.log(storeName, ': invalid date format:', value, '( must be: YYYY-MM-DD)');
                return false;
            }
        }
        // check types of values
        if (typeof value !== schema[key].type && value !== schema[key].defaultValue) {
            console.log(storeName, ': invalid value encountered:', value, '( key:', key, ')');
            return false;
        }
        return true;
    }

    function getBlankItem(schema) {
        return _.assign({}, schema, function (objectValue, sourceValue) {
            return sourceValue.defaultValue === undefined ? '' : sourceValue.defaultValue;
        });
    }

    function isWritableData(data, schema) {
        return _.every(data, function (value, key) {
            return schema[key].writable;
        });
    }

    function updateItem(collection, itemId, newItemData, schema, storeName) {
        var item = _.find(collection, {id: itemId});
        if (item === undefined) {
            console.log(storeName, ': attempt to update non existent item (id:', itemId, ')');
            return false;
        }
        if (isWritableData(newItemData, schema)) {
            newItemData = _.cloneDeep(newItemData);
            _.forEach(newItemData, function (value, key) {
                item[key] = newItemData[key];
            });
            return true;
        }
        console.log(storeName, ': attempt to set non writable fields (id:', itemId, '), ');
        return false;
    }

    return {
        generateGuid: generateGuid,
        isValidValue: isValidValue,
        getBlankItem: getBlankItem,
        isWritableData: isWritableData,
        updateItem: updateItem
    };
})
;

