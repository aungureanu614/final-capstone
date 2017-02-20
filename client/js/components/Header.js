var React = require('react');
var router = require('react-router');
var Link = router.Link;

var Header = React.createClass({

    render: function(){
        return (
            <nav className="navbar-top">
            
                    <ul className="nav-top">
                        <li id="home"><Link to={"/home"}>Home</Link></li>
                        <li id="search"><Link to={"/search"}>Search</Link></li>
                    </ul>
           </nav>
        )

    },

});

module.exports = Header;