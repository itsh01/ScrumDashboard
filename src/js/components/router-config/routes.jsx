define([
    'React',
    'ReactRouter',
    '../MainContainer',
    '../HomeView',
    'components/team-management/TeamManagement'
], function (React, Router, Main, Home, TeamManagement) {
    'use strict';
    var DefaultRoute = Router.DefaultRoute;
    var Route = Router.Route;

    var routes = (
        <Route name='app' path='/' handler={Main}>
            <Route name='team' path='/team/:id' handler={Home} />
            <Route name='team-management' path='team-management' handler={TeamManagement} />
            <Route name='manage-team' path='/team-management/:id' handler={TeamManagement} />
            <DefaultRoute handler={Home}/>
        </Route>
    );
    return routes;
});