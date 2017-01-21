var React = require("react");
var should = require("chai").should();

var actions = require("../../client/js/actions/actions");
var reducer = require("../../client/js/reducers/reducers");

describe("Action creators and reducers", function() {
  it("should handle SIMPLE_SUCCESS", function(){
    var actualState = reducer({}, actions.simpleSuccess());
    actualState = JSON.stringify(actualState);
    var expectedState = JSON.stringify({success: true});
    actualState.should.equal(expectedState);
  });
  it("should handle SIMPLE_ERROR", function(){
    var actualState = reducer({}, actions.simpleError());
    actualState = JSON.stringify(actualState);
    var expectedState = JSON.stringify({success: false});
    actualState.should.equal(expectedState);
  });
});
