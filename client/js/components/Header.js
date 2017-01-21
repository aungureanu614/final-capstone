var React = require('react');
var router = require('react-router');
var Link = router.Link;

var Header = React.createClass({

	render: function(){
		return (
			<nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                    	<li id="home"><Link to={"/home"}>Home</Link></li>
                        <li id="search"><Link to={"/search"}>Search</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
		)

	},

});

module.exports = Header;