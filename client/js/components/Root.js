var React = require('react');
var Header = require('./Header');

var Root = React.createClass({
	
	render: function(){
	return(
		<div>
			<div className="container">
				<div className="row">
					<div className="col-m-10 col-offset-1">
						<h1>Artist Finder</h1>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-m-10 col-offset-1">
						<Header />
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-m-10 col-offset-1">
						{this.props.children}
					</div>
				</div>
			</div>

		</div>
		);
	}
});

module.exports = Root;