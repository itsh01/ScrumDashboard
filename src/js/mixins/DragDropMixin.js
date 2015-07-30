/**
 * Created by itaysh on 7/30/15.
 */

define([],
    function () {
        'use strict';


        return {
            isAttrEnabled: function (attr) {
                return this.dragDrop && this.dragDrop[attr];
            },
            isDroppable: function () {
                return this.isAttrEnabled('droppable');
            },
            isDraggable: function () {
                return this.isAttrEnabled('draggable');
            },
            componentDidMount: function () {
                if (this.isDroppable()) {
                    this.getDOMNode().addEventListener('dragover', this.handleDragOver);
                }

                if (this.isDraggable()) {
                    this.getDOMNode().draggable = true;
                }
            },
            componentWillUnmount: function () {
                if (this.isDroppable()) {
                    this.getDOMNode().removeEventListener('dragover', this.handleDragOver);
                }
            },
            handleDragOver: function (e) {
                e.preventDefault();
            }
        };
    }
);