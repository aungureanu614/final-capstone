var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var config = require("./config");
var Record = require("./models/record");



var app = express();

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
        
        }else{
           res.json({});
        }
        
     })

})



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
