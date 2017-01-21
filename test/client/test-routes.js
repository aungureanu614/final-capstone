var React = require("react");
var should = require("chai").should();
var match = require("react-router").match;


var routes = require("../../client/js/routes");

describe("Routes", function(){
  it("should render App when visiting /", function(done){
    match({routes, location: "/"}, function(error, redirectLocation, renderProps) {
      var App = function () {};
      if (error) {
        console.error(error);
      };
      var results = renderProps.components;      
      results[1].displayName.should.equal("App");
    })
    done();
  })
}); 
