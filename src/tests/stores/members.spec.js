/**
 * Created by itaysh on 8/10/15.
 */

define([
        'stores/dispatcher',
        'stores/members'
    ],
    function (Dispatcher, MembersStore) {
        'use strict';

        var mockDispatcher = new Dispatcher();
        var mockMembersStore = new MembersStore(mockDispatcher);

        //var mockMemberData = {
        //        id: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
        //        name: 'Elissa Collier',
        //        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
        //        active: true
        //    };

        describe('MembersStore', function () {

            describe('getBlankMember', function () {
                it('should generate a blank member', function () {
                    var blankMember = mockMembersStore.getBlankMember();

                    expect(blankMember.name).toBe('');
                    expect(blankMember.image).toBe('');
                    expect(blankMember.active).toBe(true);
                });

            });
        });
    }
);