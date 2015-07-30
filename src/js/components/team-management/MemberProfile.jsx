define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Member Profile',
        propTypes: {
            member: React.PropTypes.object
        },
        render: function () {
            var classSet = React.addons.classSet;
            return (
                <div className={classSet('member-profile', 'inline-block')}>
                    <h3 className={classSet('member-name')}>{this.props.member.name}</h3>
                    <img className='inline-block'
                         alt={this.props.member.name}
                         src={this.props.member.image}/>

                </div>
            );
        }
    });
});



