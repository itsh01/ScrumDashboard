define(['React', 'stores/flux', 'constants', 'stubContext', 'components/general/Search'],
    function (React, Flux, constants, stubContext, Search) {
        'use strict';
        var comp;
        var flux;
        var mockMembers = [
            {
                id: '0e8b324c-d49a-474d-8af4-f93bcc6a1511',
                name: 'Elissa Collier',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg',
                active: true
            },
            {
                id: '15fc4096-b641-436a-bf2d-8fbdeedec7b2',
                name: 'Cortney Kunde',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/okseanjay/128.jpg',
                active: true
            },
            {
                id: '061804a2-1f93-40e1-bf49-57b82e5b568b',
                name: 'Jazmyne Huels',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/davidmerrique/128.jpg',
                active: true
            },
            {
                id: '183323c8-d707-4471-8736-373eba8aaa8c',
                name: 'Kacie Smitham',
                image: 'https://s3.amazonaws.com/uifaces/faces/twitter/arishi_/128.jpg',
                active: true
            }];
        var mockProps = {
            excludedCollection: [mockMembers[0], mockMembers[1]],
            searchCollection: [mockMembers[2], mockMembers[3]]
        };
        var reactTestUtils = React.addons.TestUtils;
        describe('Search', function () {
            beforeEach(function () {
                localStorage.clear();
                flux = new Flux();
                var SearchWithContext = stubContext(Search, {flux: flux});
                var instance = React.createElement(SearchWithContext, mockProps);
                var wrappedElement = reactTestUtils.renderIntoDocument(instance).getWrappedElement();
                comp = reactTestUtils.renderIntoDocument(wrappedElement);
                spyOn(flux.dispatcher, 'dispatchAction').and.callFake(function () {
                });
            });

            it('should change state when input is changed', function () {
                spyOn(comp, 'setState');
                var input = comp.refs.searchInput.getDOMNode();
                reactTestUtils.Simulate.change(input, {target: {value: 'a'}});
                expect(comp.setState).toHaveBeenCalledWith({searchStr: 'a'});
            });

            it('should return correct results, and exclude irrelevant results', function () {
                comp.setState({searchStr: 'e'});
                expect(comp.filterSearchResults()).toEqual([mockMembers[2], mockMembers[3]]);

            });

        });
    });