var React = require("react");
var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;                 //有_k query
var createMemoryHistory = ReactRouter.createMemoryHistory; //无_k query

var Application = require('./application.jsx');

var router = (
	<Router history={hashHistory}>
    <Route path="/" component={Application}>
      <IndexRoute getComponent={ function(location, callback){
	      require.ensure([], function () {
	        callback(null, require('./view/home.jsx'));
	      });
	    }} />
	    <Route path="/list" getComponent={ function(location, callback){
			  require.ensure([], function () {
			    callback(null, require('./view/list.jsx'));
			  });
			}} />
    </Route>
  </Router>
)

module.exports = router;