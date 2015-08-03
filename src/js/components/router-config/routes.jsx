define([
    'React',
    'ReactRouter',
    '../MainContainer',
    '../HomeView'
], function (React, Router, Main, Home) {
    var DefaultRoute = Router.DefaultRoute;
    var Route = Router.Route;

    var routes = (
        <Route name='app' path='/' handler={Main}>
            <Route path='/:id' handler={Home} />
            <DefaultRoute handler={Home}/>
        </Route>
    );
    return routes;
});