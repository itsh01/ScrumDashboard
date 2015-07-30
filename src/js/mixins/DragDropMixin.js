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
                return this.dragDropData && this.dragDropData[attr];
            },
            isDroppable: function () {
                return this.isAttrEnabled('droppable');
            },
            isDraggable: function () {
                return this.isAttrEnabled('draggable');
            },
            componentDidMount: function () {
                var node = this.getDOMNode();

                this.dragDropData = this.dragDrop();

                if (this.isDroppable()) {
                    node.addEventListener('dragover', this.handleDragOver, this);
                    node.addEventListener('drop', this.handleDrop, this);
                }

                if (this.isDraggable()) {
                    node.draggable = true;
                    node.addEventListener('dragstart', this.handleDragStart, this);
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
                var jsonData = e.dataTransfer.getData('data');

                e.preventDefault();

                if (!this.dragDropData.drop) {
                    throw new Error('Must define drop function when using droppable');
                }

                this.dragDropData.drop(JSON.parse(jsonData));
            },
            handleDragStart: function (e) {
                var data = this.dragDropData.dataTransfer;

                e.dataTransfer.setData('data', JSON.stringify(data));
            }
        };
    }
);