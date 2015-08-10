define(['stores/helpers'], function (helpers) {
    describe('helpers.js', function () {
        it('should save to local storage ', function () {
            window.localStorage.clear();
            var mockObj = {a:1, b:2};
            var mockStoreName = 'checkstore';
            helpers.saveToLocalStorage(mockStoreName, mockObj);
            var restoredObj = helpers.restoreFromLocalStorage(mockStoreName);

            expect(JSON.stringify(mockObj)).toBe(JSON.stringify(restoredObj));
        });

    });
});