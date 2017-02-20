var React = require('react');
var Header = require('./Header');

var Root = React.createClass({
	//entry point for routes
	render: function(){
	return(
		<div className="title">
			<h1 className="app-title">Artist Finder</h1>
					
			<div className="header">
				<Header />
			</div>
			<div className="children">
				{this.props.children}
			</div>
		</div>
		);
	}
});

module.exports = Root;