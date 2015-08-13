/**
 * Created by itaysh on 7/27/15.
 */

define([
        'lodash',
        'React',

        'components/MainView',
        'stores/flux',
        'stores/refactor/flux',

        'components/pop-up/Basic',
        'components/card-edit/CardEditCreate'
    ],
    function (_, React, MainView, Flux, NewFlux, Popup, CardEditCreate) {
        'use strict';


        /** jsx React.DOM */
        return React.createClass({
            displayName: 'MainContainer',

            childContextTypes: {
                flux: React.PropTypes.any,
                newFlux: React.PropTypes.any
            },

            getInitialState: function () {
                this.flux = new Flux();
                this.flux.dispatcher.registerEventsHandled(this.forceUpdate.bind(this));
                this.newFlux = new NewFlux();
                return {};
            },

            getChildContext: function () {
                return {
                    flux: this.flux,
                    newFlux: this.newFlux
                };
            },

            popUpFactory: function () {
                if (!this.flux.planningStore.getIsAddingOrEditingCard()) {
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
                        <MainView />
                    </div>);
            }
        });

    });
