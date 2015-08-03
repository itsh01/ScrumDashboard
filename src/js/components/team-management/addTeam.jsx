define(['lodash', 'React'], function (_, React) {
    'use strict';
    return React.createClass({
        displayName: 'Add Team',
        getInitialState: function () {
            return {
                isInputVisible: false
            };
        },
        toggleInput: function () {
            this.setState(
                {
                    isInputVisible: !this.state.isInputVisible
                }
            );
        },
        render: function () {
            var resultContent = this.state.isInputVisible ?

                <input onBlur={this.toggleInput} type='text' className='team-input' autoFocus={true}/> :
                <div onClick={this.toggleInput}> plux </div>;

            return (
                <div className='team-name'>
                    {resultContent}
                </div>
            );
        }
    });
});