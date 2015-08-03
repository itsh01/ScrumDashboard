/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',

        'components/HomeView',
        'stores/flux'
    ],
    function (_, React, HomeView, Flux) {
        'use strict';

        /** jsx React.DOM */
        return React.createClass({
            displayName: 'MainContainer',

            contextTypes: {
                router: React.PropTypes.func
            },
            childContextTypes: {
                flux: React.PropTypes.any
            },

            getInitialState: function () {
                this.flux = new Flux();
                this.flux.dispatcher.registerEventsHandled(this.forceUpdate.bind(this));
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
                        <HomeView {...this.props} {...this.state}/>
                    </div>);
            }
        });

    });
