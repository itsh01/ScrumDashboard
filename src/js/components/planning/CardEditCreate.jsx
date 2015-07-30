define(
    ['React'],
    function (React) {
        'use strict';
        return React.createClass({
            mixins: [React.addons.LinkedStateMixin],

            displayName: 'CardEditCreate',
            propTypes: {
                isCreating: React.PropTypes.bool.isRequired
            },

            contextTypes: {
                flux: React.PropTypes.any
            },
            saveOrDeleteCard: function(){
                var dispatcher = this.context.flux.dispatcher;
                if(this.props.isCreating){
                    dispatcher.dispatchAction(
                        'PLANNING_ADD_CARD',
                        {
                            name: this.state.name
                        }
                    );
                }else{

                }
            },
            getInitialState: function(){
                return{
                    name: 'blabla'
                };
            },
            render: function () {
                var saveDelTxt = this.props.isCreating ? 'Save' : 'Delete';
                return (
                    <div>
                        <div>
                            <span>name</span>
                            <input type='text' valueLink={this.linkState('name')}></input>
                        </div>

                        <div>
                            <span>description</span>
                            <input type='text'></input>
                        </div>

                        <div>
                            <span>score</span>
                            <input type='text'></input>

                        </div>

                        <input type='checkbox'>Assign to All</input>
                        <button>Cancel</button>
                        <button onClick={this.saveOrDeleteCard}>{saveDelTxt}</button>

                    </div>
                );
            }
        });
    });