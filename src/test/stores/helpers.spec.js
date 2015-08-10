define('tests', ['helpers'], function (helpers) {

    describe('helpers', function () {

        it('should save to local storage', function () {
            var storeName = 'myStore', object = {number: 1, name: 'object 1'};
            helpers.saveToLocalStorage(storeName, object);
            expect(JSON.stringify(localStorage.getItem(storeName))).toBe(JSON.stringify(object));
        });

        it('should get from local storage', function () {
            var storeName = 'myStore', object = {number: 1, name: 'object 1'};
            localStorage.setItem(storeName, JSON.stringify(object));
            var restoredObject = helpers.restoreFromLocalStorage(storeName);
            expect(JSON.stringify(restoredObject)).toBe(JSON.stringify(object));
        });

        it('should remove from local storage', function () {
            var storeName = 'myStore', object = {number: 1, name: 'object 1'};
            localStorage.setItem(storeName, JSON.stringify(object));
            helpers.removeFromLocalStorage(storeName);
            expect(localStorage.getItem(storeName)).not.toBeDefined();
        });
        
    });
});