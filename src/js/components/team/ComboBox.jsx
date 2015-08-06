define(['lodash', 'React'],
    function (_, React) {
        'use strict';

        return React.createClass({
            displayName: 'ComboBox',

            propTypes: {
                lifecycle: React.PropTypes.array
            },

            contextTypes: {
                flux: React.PropTypes.any
            },

            render: function () {
                var phaseList = _.map(this.props.lifecycle, function (phase) {
                    return (<li className="combo-box-item" key={phase}>
                        {phase}
                        <span className="delete-phase">X</span>
                    </li>);
                });

                return (<div>
                    <input type="text"/>
                    <ul className="combo-box-list">
                        {phaseList}
                    </ul>
                </div>);
            }
        });
    }
);
