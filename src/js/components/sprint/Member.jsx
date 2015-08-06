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
            contextTypes: {
                scrumMaster: React.PropTypes.string
            },
            getDefaultProps: function () {
                return {
                    member: {
                        id: 1,
                        name: 'Foo Bar',
                        image: 'http://icons.iconarchive.com/icons/sora-meliae/matrilineare/128/avatar-default-icon.png'
                    }
                };
            },
            render: function () {
                var isScrumMaster = this.props.member.id === this.context.scrumMaster,
                    imagePath = 'img/crown.png',
                    scrumMasterComp = <img className='scrum-master' src={imagePath} />;


                return (<div className="sprint-member">
                    <figure>
                        { isScrumMaster ? scrumMasterComp : null}
                        <img
                            alt={this.props.member.name}
                            className="sprint-member-image"
                            draggable="false"
                            src={this.props.member.image}/>
                        <figcaption className="text-center">{this.props.member.name}</figcaption>
                    </figure>
                </div>);
            }
        });
    });