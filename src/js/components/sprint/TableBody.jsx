
define([
        'lodash',
        'React',
        'components/sprint/Member'
    ],
    function (_, React, SprintMember) {
        'use strict';

        return React.createClass({
            displayName: 'Sprint Table Body',
            render: function () {
                return (<div className="table-tbody">
                    <div className="table-row">
                        <div className="table-cell">
                            <SprintMember />
                        </div>
                        <div className="table-cell">1</div>
                        <div className="table-cell">2</div>
                        <div className="table-cell">3</div>
                    </div>
                </div>);
            }
        });
    }
);