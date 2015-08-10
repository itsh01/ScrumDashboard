define(['stores/helpers'], function (helpers) {
    describe('helpers.js', function () {
        describe('removeFromLocalStorage', function(){
            it('should remove storeName from local storage', function(){

                localStorage.setItem('blah', 1);
                helpers.removeFromLocalStorage('blah');
                var actualResult = localStorage.getItem('blah');
                expect(actualResult).toBeNull();

            });

            it('should return undefined in case storeName does not exist in local storage', function(){
                var actualResult =  helpers.removeFromLocalStorage('blah');
                expect(actualResult).not.toBeDefined();
            });
        })
    });
});