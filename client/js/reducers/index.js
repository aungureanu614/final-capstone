var React = require('react');
var actions = require('../actions/index');

var initialState = {
	name: null,
	id: null,
	image: null,
	tracks: [],
	relatedArtists: [],
	rating: []
	
}

var appReducer = function(state, action){
	state = state || initialState;


	if(action.type === actions.TOP_TRACKS_SUCCESS){
	

		return Object.assign({}, state, {name: action.name}, {id: action.id}, {image: action.image}, 
			{tracks: action.tracks})
	}
	else if(action.type === actions.GET_ARTIST_ERROR){
		return Object.assign({}, state, {name: action.str}, {image: null}, {tracks: []})
	}
	else if(action.type === actions.GET_RELATED_SUCCESS){
		var recs = state.relatedArtists.concat(action.artist);
	
		return Object.assign({}, state, {relatedArtists: recs});
		
	}else if(action.type === actions.GET_RATING_SUCCESS){
		var score = state.rating.concat(action.rating);
		return Object.assign({}, state, {rating: score});
		
	}

	else if(action.type === actions.RESET_STATE){
		return Object.assign({}, state, {name: null}, {image: null}, {tracks: []}, {relatedArtists: []}, {rating: []});
	}
	
	
	return state;
}


module.exports = appReducer;