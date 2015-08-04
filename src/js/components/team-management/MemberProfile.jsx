define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Member Profile',
        propTypes: {
            member: React.PropTypes.object
        },

        removeMember: function () {

        },
        render: function () {
            var classSet = React.addons.classSet;
            return (
                <div className={classSet('member-profile', 'inline-block')}>
                    <h3 className={classSet('member-name')}>{this.props.member.name}</h3>
                    <img className='inline-block'
                         alt={this.props.member.name}
                         src={this.props.member.image}/>
                    <button className='remove-button' onClick={this.removeMember} id={this.props.member.id}>X</button>
                </div>
            );
        }
    });
});



