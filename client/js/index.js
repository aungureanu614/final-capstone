require('babel-polyfill');
require('whatwg-fetch');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var Root = require('./components/Root');
var Home = require('./components/Home');
var Search = require('./components/Search');


var IndexRoute = router.IndexRoute;


var store = require('./store');

document.addEventListener('DOMContentLoaded', function() {
   ReactDOM.render(
        <Provider store={store}>
            	
		<Router history={hashHistory}>
			<Route path={"/"} component={Root}>
				<IndexRoute component={Home}/>
				<Route path={"home"} component={Home}/>
				<Route path={"search"} component={Search}/>
									
			</Route>
		</Router>
	
        </Provider>,
        document.getElementById('app')
      )
 });