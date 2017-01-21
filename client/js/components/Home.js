var React = require('react');
var router = require('react-router');


var Home = React.createClass({

	render: function(){
		return (
			<div className="center-style">

				<img src='http://indieunderground.ca/wp-content/uploads/2015/08/Spotify-new-logo-Monthly-Playlist-Indie-Underground-Aaron-McMillan-730x396.jpg'></img>
				<p>Search your favorite artist and find new artists you'll love.
			    Click Search to get started!</p>
				
				<footer>
		            <div className="contact">
		                <p className="created-by">Created By: <a className="portfolio-link" href="https://aungureanu614.github.io/My-Portfolio/" target="_blank">Ana-Maria Ungureanu</a></p>
		                <a href="mailto:aungureanu614@gmail.com"><i className="fa fa-envelope" aria-hidden="true"></i></a>
		                <a href="https://github.com/aungureanu614" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
		                <a href="https://www.linkedin.com/in/ana-maria-ungureanu-b027a138" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
		            </div>
        		</footer>

			</div>
			)

	},

});

module.exports = Home;