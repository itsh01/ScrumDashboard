define(['stores/helpers'], function (helpers) {
    describe('helpers.js', function () {
        var mockStore = 'mockStore';
        var mockStoreObj = {test: 1234};
        describe('saveToLocalStorage', function () {
            it('should save to local storage', function () {
                helpers.saveToLocalStorage(mockStore, mockStoreObj);
                expect(localStorage[mockStore]).toEqual(JSON.stringify(mockStoreObj));
            });
        });

        describe('restoreFromLocalStorage', function () {
            it('should retrieve from local storage', function () {
                helpers.saveToLocalStorage(mockStore, mockStoreObj);
                expect(helpers.restoreFromLocalStorage(mockStore)).toEqual(mockStoreObj);
            });
        });

    });
});