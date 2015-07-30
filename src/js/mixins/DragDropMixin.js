/**
 * Created by itaysh on 7/30/15.
 */

define([],
    function () {
        'use strict';


        return {
            componentDidMount: function () {
                this.getDOMNode().addEventListener('dragover', this.handleDragOver);
            },
            componentWillUnmount: function () {
                this.getDOMNode().removeEventListener('dragover', this.handleDragOver);
            },
            handleDragOver: function (e) {
                e.preventDefault();
            }
        };
    }
);