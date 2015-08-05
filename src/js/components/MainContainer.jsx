/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',

        'components/HomeView',
        'stores/flux',

        'components/pop-up/Basic',
        'components/card-edit/CardEditCreate'
    ],
    function (_, React, HomeView, Flux, Popup, CardEditCreate) {
        'use strict';


        /** jsx React.DOM */
        return React.createClass({
            displayName: 'MainContainer',

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

            popUpFactory: function () {
                if (!this.flux.planningStore.isAddingCard) {
                    return null;
                }
                return (
                    <Popup>
                        <CardEditCreate />
                    </Popup>
                );

            },
            render: function () {

                return (
                    <div>
                        {this.popUpFactory()}
                        <HomeView />
                    </div>);
            }
        });

    });
