define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Add new member',
        propTypes: {
            team: React.PropTypes.object
        },
        contextTypes: {
            newFlux: React.PropTypes.any,
            blankMemberSchema: React.PropTypes.object
        },
        componentDidMount: function componentDidMount() {
            this.flux = this.context.newFlux;
        },
        addNewMember: function (event) {
            event.preventDefault();
            var teamId = this.props.team.id;
            var memberName = this.refs.memberName.getDOMNode().value;
            if (memberName) {
                var memberImgUrl = this.refs.memberImgUrl.getDOMNode().value || 'img/mosh.jpg';
                var newMember = _.clone(this.context.blankMemberSchema);
                newMember.name = memberName;
                newMember.image = memberImgUrl;
                this.flux.membersActions.createMemberIntoTeam(newMember, teamId);
            }
        },

        render: function render() {
            return (
                <form className='add-new-member' onSubmit={this.addNewMember}>
                    <input ref='memberName' type='text' placeholder='Member name'
                           className='member-name-input'/>
                    <img src='img/mosh.jpg' alt='mosh is cute' className='member-img'/>
                    <input ref='memberImgUrl' type='url' placeholder='image url'
                           className='img-url-input'/>
                    <button type="submit" className="hidden"></button>
                </form>

            );
        }
    });
});
