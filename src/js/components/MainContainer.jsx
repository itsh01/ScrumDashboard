/**
 * Created by itaysh on 7/27/15.
 */

define(['lodash', 'React', 'components/TeamManagement', '../stores/flux'], function (_, React, TeamManagementComponent, Flux) {
    'use strict';

    /** jsx React.DOM */
    return React.createClass({
        displayName: 'MainContainer',

        childContextTypes: {
            flux: React.PropTypes.any
        },

        getInitialState: function () {
            this.flux = new Flux();
            this.flux.dispatcher.registerEventsHandled(this.forceUpdate);
            return {};
        },

        getChildContext: function () {
            return {
                flux: this.flux
            };
        },

        render: function () {
            return (
                <div>
                    <TeamManagementComponent />
                </div>);
        }
    });
});
