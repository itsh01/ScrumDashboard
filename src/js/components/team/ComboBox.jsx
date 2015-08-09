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
                    <input type="text"/>
                    <ul className="combo-box-list">
                        {itemList}
                    </ul>
                </div>);
            }
        });
    }
);
