// var isomorphicFetch = require('isomorphic-fetch');
var GET_RELATED_SUCCESS = "GET_RELATED_SUCCESS";
var getRelatedSuccess = function(artist) {
    return {
        type: GET_RELATED_SUCCESS,
      	artist: artist
    }
}

var GET_RELATED_ERROR = "GET_RELATED_ERROR";
var getRelatedError = function() {
    return {
        type: GET_RELATED_ERROR
    }

}

var TOP_TRACKS_SUCCESS = "TOP_TRACKS_SUCCESS";
var topTracksSuccess = function(name, id, tracks, image){
	return{
		type: TOP_TRACKS_SUCCESS,
		name: name,
        id: id,
		tracks: tracks,
        image: image
	}
}

var GET_ARTIST_ERROR = "GET_ARTIST_ERROR";
var getArtistError = function(str){
    return{
        type: GET_ARTIST_ERROR,
        str: str
    }
}

var RESET_STATE = "RESET_STATE";
var resetState = function(){
    return{
        type: RESET_STATE
        }
}

var GET_RATING_SUCCESS = "GET_RATING_SUCCESS";
var getRatingSuccess = function(ratingArr){
    return{
        type: GET_RATING_SUCCESS,
        rating: ratingArr 
        }
}



var getArtistId = function(artistName) {
    return function(dispatch) {
        var url = 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist';

        const headers = new Headers();
        headers.append('Authorization', 'Bearer BQCovdFAkxYRTWdPHEMf-0az--8AMj7kVkYNXq9fq32j0WvHbKA9X4wh-8lr2tH8jZljHkcqe6vLC3H7JnHAUgWtk4wMDO4vrO9QBNyVwUB0a_u2l039LOEo1BYb0EFOD_n4yx_vprVVGuRpNNCOEwPGpJ-53oqNvw');

        return fetch(url).then(function(response) {

                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText)
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(function(response) {
       
                return response.json();

            })
            .then(function(data) {
               
                var artistId = data.artists.items[0].id;
                var artistImg = data.artists.items[0].images[0].url;
                return dispatch(
                    getArtistSongs(artistName, artistId, artistImg)
                );
            })
            .catch(function(error) {
                return dispatch(getArtistError("Artist does not exist, try again"));
            })
    }

};

var getArtistSongs = function(artistName, artistId, artistImg) {
    return function(dispatch) {
        var url = 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US';

        const headers = new Headers();
        headers.append('Authorization', 'Bearer: BQBtevz7LumfOK4lDuEnwUMoC1aMvLi2THUdGpSZraY6_ZHe3E1Trj-rDzHJTSb5aunqoQ35gZ8mQ1nR2rVQOHNCcYUIoi9Y-Vc63ri27swttapIn9WRiQK729sSwZRyf_vHywK5-fUjnCJ6SzdO5-HqzY1DFlufHQ');

        return fetch(url, {
            headers
        }).then(function(response) {

                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText)
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(function(response) {
		
                return response.json();

            })
            .then(function(data) {
            	
                var artistTracks = data.tracks;
                
               dispatch(topTracksSuccess(artistName, artistId, artistTracks, artistImg));
               return artistId;
                
                
            })
            .then(function(artistId){
            	return dispatch(getRelatedId(artistId));
            })
            .catch(function(error) {
                return dispatch(error);
            })
    }
};

var RelatedArtist = function(relatedArtist) {
    this.name = relatedArtist.name;
    this.id = relatedArtist.id;
    this.image = relatedArtist.images[0].url;
    this.tracks = [];
}


var getRelatedId = function(artistId) {
    
   
    return function(dispatch) {
        var url = 'https://api.spotify.com/v1/artists/' + artistId + '/related-artists';
        return fetch(url).then(function(response) {

                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText)
                    error.response = response;
                    throw error;
                }

                return response;
            })
            .then(function(response) {
            
                return response.json();

            })
            .then(function(data) {
            	
            	var topFive = data.artists.slice(0,5);
                
            	var recArtists = []
            	for(var i=0; i<topFive.length;i++){
            		var relatedArtist = new RelatedArtist(topFive[i]);
            		recArtists.push(relatedArtist)

            	}

         
                return recArtists;
               
            })
            .then(function(recArtists){
            	
            	for(var i=0;i<recArtists.length;i++){
            		dispatch(getRelatedSongs(recArtists[i]));
            	}
            	return;
            })

            .catch(function(error) {
                return dispatch(error);
            })
    }
};

var getRelatedSongs = function(artist) {
    return function(dispatch) {
    	
    	    var url = 'https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US'
    	    fetch(url).then(function(response) {

    	        if (response.status < 200 || response.status >= 300) {
    	            var error = new Error(response.statusText)
    	            error.response = response;
    	            throw error;
    	        }
    	        return response
    	    })

    	    .then(function(response) {
    	 
    	        return response.json();

    	    })

    	    .then(function(data) {
    	    	artist.tracks = data;
    	    
    	    	return artist;

    	    })
    	    .then(function(artist){
    	    	
    	    	return dispatch(getRelatedSuccess(artist));
    	    })
    	    .catch(function(error) {
    	    
    	        return dispatch(error);
    	    })

    	}

};

var getRating = function(name){
    return function(dispatch) {
    var url = "/rating";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };


    fetch(url+"/"+ name, {method: "GET", headers: headers})
    .then(function(response) {
       
       return response.json();
    })
    .then(function(data) {
        
        return dispatch(getRatingSuccess(data[0].rating));
    })
    .catch(function(error) {
      console.log(error);
    });  
  }
}

var addRating = function(name, rating) {
  return function(dispatch) {
    
    var body = JSON.stringify({name: name, rating: rating});

    var url = "/rating";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "POST", headers: headers, body:body})
    .then(function(response) {
        
      return response.json();
    })
    .then(function(data) {
     
     return data;
      
    }); 
  }
};





exports.getArtistId = getArtistId;
exports.getArtistSongs = getArtistSongs;
exports.addRating = addRating;
exports.getRating = getRating;

exports.TOP_TRACKS_SUCCESS = TOP_TRACKS_SUCCESS;
exports.topTracksSuccess = topTracksSuccess;
exports.GET_RELATED_SUCCESS = GET_RELATED_SUCCESS;
exports.getRelatedSuccess = getRelatedSuccess;
exports.getRatingSuccess = getRatingSuccess;
exports.GET_RATING_SUCCESS = GET_RATING_SUCCESS;


exports.GET_ARTIST_ERROR = GET_ARTIST_ERROR;
exports.getArtistError = getArtistError;

exports.getRelatedId = getRelatedId;
exports.getRelatedSongs = getRelatedSongs;

exports.resetState = resetState;
exports.RESET_STATE = RESET_STATE;