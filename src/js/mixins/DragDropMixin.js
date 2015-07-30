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
                var node = this.getDOMNode();

                if (this.isDroppable()) {
                    node.addEventListener('dragover', this.handleDragOver);
                    node.addEventListener('drop', this.handleDrop);
                }

                if (this.isDraggable()) {
                    node.draggable = true;
                }
            },
            componentWillUnmount: function () {
                var node = this.getDOMNode();

                if (this.isDroppable()) {
                    node.removeEventListener('dragover', this.handleDragOver);
                    node.removeEventListener('drop', this.handleDrop);
                }
            },
            handleDragOver: function (e) {
                e.preventDefault();
            },
            handleDrop: function (e) {
                e.preventDefault();
            }
        };
    }
);