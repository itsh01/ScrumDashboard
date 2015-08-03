/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',
        'ReactRouter',

        'components/HomeView',
        'stores/flux',

        'components/pop-up/Basic',
        'components/card-edit/CardEditCreate'
    ],
    function (_, React, Router, HomeView, Flux, Popup, CardEditCreate) {
        'use strict';

        var RouteHandler = Router.RouteHandler;
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
                var popUp = null;
                if (this.flux.planningStore.isAddingCard) {
                    popUp = (
                        <Popup>
                            <CardEditCreate isPop={false}/>
                        </Popup>
                    );
                }
                return (
                    <div>
                        {popUp}
                        <RouteHandler {...this.props} customProp={true} />
                    </div>);
            }
        });

    });
