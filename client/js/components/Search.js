var React = require('react');
var connect = require('react-redux').connect;


var actions = require('../actions/index');
var RelatedArtists= require('./RelatedArtists');

var Search = React.createClass({
	submitForm: function(event){
		event.preventDefault();
		var artistName = this.refs.artist.value;
		this.props.dispatch(actions.resetState());
		this.props.dispatch(actions.getRating(artistName));
		this.props.dispatch(actions.getArtistId(artistName));
		
		
	},

	submitRating: function(rating){
		
		this.props.dispatch(actions.addRating(this.props.artistInfo.name, rating));
		this.props.dispatch(actions.getRating(this.props.artistInfo.name));

	},
	getRating: function(artist){
			
			
			if(artist.rating.length===0){
				return (
						<p>Playlist not yet rated</p>
					)
			}else{
				
				var add = artist.rating.reduce(function(sum, score){
					
					return sum + score;
				},0)
				
				var avg = (add/artist.rating.length).toFixed(1);
			
				return (
						<p>Playlist Rating: {avg}/5.0</p>
					)
				// calculate average rating
			}
		
	},

    searchedArtist: function(artist){
    	
    	if(artist.name != null && artist.name != "Artist does not exist, try again"){

    		var tracks = [];
    		for(var i=0;i<artist.tracks.length;i++){
    			tracks.push(artist.tracks[i].id)
    		}
    

    		return(
    			<div className="search-artist">
    				<p>{artist.name}</p>
    				<img src={artist.image}></img>
    				<iframe src={'https://embed.spotify.com/?uri=spotify:trackset:Top 10 Playlist:' + tracks.join(',')} 
				 	frameBorder="0" allowTransparency="true"></iframe>
					
						{this.getRating(this.props.artistInfo)}				 

				 	<div className="dropdown">
  						<button className="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown">Rate {artist.name} Playlist
  						<span className="caret"></span></button>
	  					<ul className="dropdown-menu">
	    					<li onClick={this.submitRating.bind(this, 5)}>5 - Awesome</li>
						    <li onClick={this.submitRating.bind(this, 4)}>4 - Not bad</li>
						    <li onClick={this.submitRating.bind(this, 3)}>3 - Kinda meh</li>
						    <li onClick={this.submitRating.bind(this, 2)}>2 - Not my thing</li>
						    <li onClick={this.submitRating.bind(this, 1)}>1 - Make it stop</li>
	  					</ul>
					</div>
				 	

    			</div>
    			)
    	
    	}else{
    		return(
    			<div className="search-artist">
    				<p>{artist.name}</p>
    				
    			</div>
    			)
    	}
    },


	render: function(){
			
		return (
			<div>
				
				<form className="submitForm" onSubmit={this.submitForm}>
					<input className="artist-input" type="text" ref="artist" placeholder="Artist Name"/>
					<button type="submit" className="submit">Submit</button>

				</form>

				<div>

				    {this.searchedArtist(this.props.artistInfo)}
				
						
					<RelatedArtists relatedArtists={this.props.artistInfo.relatedArtists}/>
					
				</div>
				
			</div>
			);

	}

});

var mapStateToProps = function(state, props){
	return{
		artistInfo: state
	}
}

var Container = connect(mapStateToProps)(Search);

module.exports = Container;