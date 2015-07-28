
define(['lodash', 'React'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'Sprint Table Body',
        render: function () {
            return (<div className="table-tbody">
                <div className="table-row">
                    <div className="table-cell">1</div>
                    <div className="table-cell">2</div>
                    <div className="table-cell">3</div>
                </div>
            </div>);
        }
    });

});