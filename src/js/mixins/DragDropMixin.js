/**
 * Created by itaysh on 7/30/15.
 */

define([],
    function () {
        'use strict';


        return {
            /*
             *  usage:
              *
              *  mixins: [DragDropMixin],
              *  dragDrop: function () {
              *
              *     return {
              *
              *         // when dragging an item
              *         draggable: true,
              *         dataTransfer: { myItem: item1 }
              *
              *         // when dropping an item:
              *         droppable: true,
              *         drop: function (myItem) {},
              *     };
              *  }
              *
             */
            isAttrEnabled: function (attr) {
                var dragDrop = this.dragDrop();
                return dragDrop && dragDrop[attr];
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
                    node.addEventListener('dragstart', this.handleDragStart);
                }
            },
            componentWillUnmount: function () {
                var node = this.getDOMNode();

                if (this.isDroppable()) {
                    node.removeEventListener('dragover', this.handleDragOver);
                    node.removeEventListener('drop', this.handleDrop);
                }

                if (this.isDraggable()) {
                    node.removeEventListener('dragstart', this.handleDragStart);
                }
            },
            handleDragOver: function (e) {
                e.preventDefault();
            },
            handleDrop: function (e) {
                var data = e.dataTransfer.getData('data'),
                    dragDrop = this.dragDrop();

                e.preventDefault();

                if (!dragDrop.drop) {
                    throw new Error('Must define drop function when using droppable');
                }

                dragDrop.drop(data);
            },
            handleDragStart: function (e) {
                var dragDrop = this.dragDrop(),
                    data = dragDrop.dataTransfer;

                e.dataTransfer.setData('data', data);
            }
        };
    }
);