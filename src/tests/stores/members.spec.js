///**
// * Created by itaysh on 8/10/15.
// */
//
//define([
//        'stores/dispatcher',
//        'stores/members'
//    ],
//    function (Dispatcher, MembersStore) {
//        'use strict';
//
//        var mockDispatcher = null;
//        var mockMembersStore = null;
//
//        //var mockMemberData = {
//        //        id: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//        //        name: 'Elissa Collier',
//        //        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
//        //        active: true
//        //    };
//
//        describe('MembersStore', function () {
//
//            beforeEach(function () {
//                var mockMembers = [
//                    {
//                        id: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
//                        name: 'Elissa Collier',
//                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
//                        active: true
//                    },
//                    {
//                        id: '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
//                        name: 'Cortney Kunde',
//                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/okseanjay/128.jpg',
//                        active: true
//                    },
//                    {
//                        id: '061804a2-1f93-40e1-bf49-57b82e5b568b',
//                        name: 'Jazmyne Huels',
//                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/davidmerrique/128.jpg',
//                        active: true
//                    }
//                ];
//                mockDispatcher = new Dispatcher();
//                mockMembersStore = new MembersStore(mockDispatcher, mockMembers);
//            });
//
//            describe('getBlankMember', function () {
//
//                it('should generate a blank member', function () {
//                    var blankMember = mockMembersStore.getBlankMember();
//
//                    expect(blankMember.name).toBe('');
//                    expect(blankMember.image).toBe('');
//                    expect(blankMember.active).toBe(true);
//                });
//
//            });
//        });
//    }
//);