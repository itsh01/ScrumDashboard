define([
        'lodash',
        'React',
        'components/sprint/MemberRow'
    ],
    function (_, React, SprintMemberRow) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Body',
            propTypes: {
                cardLifecycle: React.PropTypes.array,
                members: React.PropTypes.array
            },
            getDefaultProps: function () {
                return {
                    cardLifecycle: ['Backlog', 'In progress', 'Done'],
                    members: [{
                        id: 'cba60761-a30a-4c07-8e3c-1bef60a5d873',
                        name: 'Odie Predovic',
                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/antjanus/128.jpg'
                    }, {
                        id: '15c893ea-5463-471d-a59e-8acba34fdb66',
                        name: 'Arielle Conroy',
                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg'
                    }, {
                        id: '63388982-b3b9-479e-9b76-d7a979ad8606',
                        name: 'Gilberto Runolfsson',
                        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mrebay007/128.jpg'
                    }]
                };
            },
            render: function () {
                var rows = _.map(this.props.members, function (member) {
                    return (<SprintMemberRow
                        cardLifecycle={this.props.cardLifecycle}
                        key={member.id} />);
                }, this);

                return (<div className="tbody">
                    {rows}
                </div>);
            }
        });
    }
);