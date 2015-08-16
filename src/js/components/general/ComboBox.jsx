define(['lodash', 'React'],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'ComboBox',

            propTypes: {
                handleChange: React.PropTypes.func,
                items: React.PropTypes.array
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            deleteItem: function (item) {
                var items = _.cloneDeep(this.props.items);

                _.remove(items, _.isEqual.bind(null, item));
                this.props.handleChange(items);
            },

            addItem: function (e) {
                e.preventDefault();

                var domNode = this.refs.newItem.getDOMNode(),
                    items = _.cloneDeep(this.props.items);

                items.push(domNode.value);

                this.props.handleChange(items);
                domNode.value = '';
            },

            handleDragStart: function (item, e) {
                e.dataTransfer.setData('data', item);
            },

            borderBottomOn: function (target) {
                target.style.setProperty('border-bottom', '#008E99 2px solid');
            },

            borderBottomOff: function (target) {
                target.style.setProperty('border-bottom', '#FFF 2px solid');
            },

            handleDragOver: function (e) {
                e.preventDefault();
                this.borderBottomOn(e.currentTarget);
            },

            handleDragLeave: function (e) {
                e.preventDefault();
                this.borderBottomOff(e.currentTarget);
            },

            handleDrop: function (e) {
                e.preventDefault();
                this.borderBottomOff(e.currentTarget);

                var item = e.dataTransfer.getData('data'),
                    indexTo = e.currentTarget.dataset.item,
                    items = _.without(this.props.items, item);

                items.splice(indexTo, 0, item);

                this.props.handleChange(items);
            },

            render: function () {
                var itemList = _.map(this.props.items, function (item, index) {
                    return (<li
                            className="combo-box-item"
                            draggable="true"
                            onDragStart={this.handleDragStart.bind(this, item)}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}
                            onDrop={this.handleDrop}
                            data-item={index}
                            key={item}>
                        {item}
                        <span
                            className="delete-phase"
                            onClick={this.deleteItem.bind(this, item)}>
                            X
                        </span>
                    </li>);
                }, this);

                return (<div>
                    <form onSubmit={this.addItem}>
                        <input type="text" ref="newItem"/>
                    </form>
                    <ul className="combo-box-list">
                        {itemList}
                    </ul>
                </div>);
            }
        });
    }
);
