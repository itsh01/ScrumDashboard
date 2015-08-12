/**
 * Created by itaysh on 8/12/15.
 */

define([
        'lodash',
        'React',

        'stubContext',

        'components/sprint/Member'
    ],
    function (_, React, stubContext, Member) {
        'use strict';

        var mockProps = {
            member: {
                id: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                name: 'Elissa Collier',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
                active: true
            }
        };

        var mockProps2 = {
            member: {
                id: '1',
                name: 'Elissa Collier',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
                active: true
            }
        };


        var MemberWithContext = null;

        describe('Sprint Member', function () {

            beforeEach(function () {
                MemberWithContext = stubContext(Member, {
                    scrumMaster: '0e8b324c-d49a-474d-8af4-f93bcc6a1511'
                });
            });

            function renderCompWithProps(mockProps) {
                var instance = React.createElement(MemberWithContext, mockProps);
                return React.addons.TestUtils.renderIntoDocument(instance);
            }

            function queryMaster(rendered) {
                return rendered.getDOMNode().querySelector('.scrum-master');
            }

            it('should display scrum master when member id is identical', function () {
                var rendered = renderCompWithProps(mockProps),
                    scrumMaster = queryMaster(rendered);

                expect(scrumMaster).not.toBeNull();
            });

            it('should not display scrum master when member id is not identical', function () {
                var rendered = renderCompWithProps(mockProps2),
                    scrumMaster = queryMaster(rendered);

                expect(scrumMaster).toBeNull();
            });

        });
    }
);