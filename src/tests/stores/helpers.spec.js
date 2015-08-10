define(['stores/helpers'], function (helpers) {
    describe('helpers', function () {

        'use strict';

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
});