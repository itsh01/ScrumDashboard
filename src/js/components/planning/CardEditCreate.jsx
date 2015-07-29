define(
    ['React'],
    function (React) {
        return React.createClass({
            propTypes:{
                isCreating: React.PropTypes.bool.isRequired
            },
            getInitialState: function(){
              return{
                  saveDelTxt: this.props.isCreating? 'Save' : 'Cancel'
              };
            },
            render: function () {
                return (
                    <div>
                        <div>
                            <span>name</span>
                            <input type='text'></input>
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
                        <button>cancel</button>
                        <button>{this.state.saveDelTxt}</button>

                    </div>
                );
            }
        });
    });