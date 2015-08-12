define([
        'React'
    ],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'SprintCardsContainerSize',

            propTypes: {
                clickHandler: React.PropTypes.func,
                containerSize: React.PropTypes.number
            },

            render: function () {
                return (<div className='card sprint-card-wrapper cards-container-heap-size' onClick={this.props.clickHandler}>
                    <div className='container-size'>( {this.props.containerSize} )</div>
                    <img className='open-heap-img' src="img/open-heap-container.png" alt=""/>
                </div>);
            }
        });
    });