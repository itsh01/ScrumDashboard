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

            render: function () {
                var itemList = _.map(this.props.items, function (item) {
                    return (<li className="combo-box-item" key={item}>
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
