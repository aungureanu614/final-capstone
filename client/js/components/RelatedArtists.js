var React = require('react');
var connect = require('react-redux').connect;


var RelatedArtists = React.createClass({
	
	relatedSongs: function(tracks) {
		var songs = [];

		for (var i = 0; i < tracks.length; i++) {
			songs.push(tracks[i].id);
		}

		return <iframe src={'https://embed.spotify.com/?uri=spotify:trackset:Top 10 Playlist:' + songs.join(',')} frameBorder="0" allowTransparency="true"></iframe>
	},

	prepareArtists: function(relatedArtists){
		if (relatedArtists) {
			var artists = [];

			for (var i = 0; i < relatedArtists.length; i++) {
				artists.push(
					<div key={i}>
						<p>{relatedArtists[i].name}</p>
						<img src={relatedArtists[i].image}></img>
						{this.relatedSongs(relatedArtists[i].tracks.tracks)}
					</div>
				);
			}
			return artists;
		} else {
			return null;
		}
	},

	render: function(){
 
		
		return(
				<div className="related-artists">
				
					{this.prepareArtists(this.props.relatedArtists)}
				
				</div>

			)
		
	}
});

var Container = connect()(RelatedArtists);

module.exports = Container;