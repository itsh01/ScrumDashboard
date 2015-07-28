define([
        'lodash',
        'React'
    ],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Member',
            propTypes: {
                member: React.PropTypes.object
            },
            getDefaultProps: function () {
                return {
                    member: {
                        id: 1,
                        name: 'John Doe',
                        image: 'http://icons.iconarchive.com/icons/sora-meliae/matrilineare/128/avatar-default-icon.png'
                    }
                };
            },
            render: function () {
                return (<div className="sprint-member">
                    <figure>
                        <img
                            alt={this.props.member.name}
                            src={this.props.member.image}/>
                        <figcaption className="text-center">{this.props.member.name}</figcaption>
                    </figure>
                </div>);
            }
        });
    });