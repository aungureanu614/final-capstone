var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var config = require("./config");
var Record = require("./models/record");

const request = require('request');
var querystring = require('querystring');
const keys = require('./keys.json');

var app = express();

const REDIRECT_URI = 'http://localhost:8080/callback';
const CLIENT_ID = keys.client_id;
const CLIENT_SECRET = keys.client_secret;

app.use(bodyParser.json());

app.use(express.static(process.env.CLIENT_PATH || "build/dev/client/"));

app.post("/rating", function(req, res) {
  var options = {upsert:true, returnNewDocument: true};
  Record.findOneAndUpdate({name: req.body.name}, {$push: {rating:req.body.rating}
}, options, function(err, item) {
  if (err) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
  res.status(201).json(item);
});
});

app.get('/rating/:name', function(req, res){
  var name = req.params.name;

  Record.find({name: name}, function(err, item){
    console.log('this item is', item);
    if(item){
      res.json(item);
    } else {
     res.json({});
   }
 })
});

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize' + 
    '?response_type=code' +
    '&client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI));
});

app.get('/callback', function(req, res) {
  const body = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };


  request.post({
    url: 'https://accounts.spotify.com/api/token',
    form: body,
    json: true
  }, (error, response, body) => {
    res.json(body);
    // let result = res.json(body);
    //   var access_token = result.access_token,
    //         refresh_token = result.refresh_token;

    //     var options = {
    //       url: 'https://api.spotify.com/v1/me',
    //       headers: { 'Authorization': 'Bearer ' + access_token },
    //       json: true
    //     };

    //     res.redirect('/#' +
    //       querystring.stringify({
    //         access_token: access_token,
    //         refresh_token: refresh_token
    //       }));
    

  });
});

var runServer = function(callback) {
  mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
      return callback(err);
    }
    app.listen(config.PORT, function() {
      console.log("Listening on localhost:" + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
}

exports.app = app;
exports.runServer = runServer;
