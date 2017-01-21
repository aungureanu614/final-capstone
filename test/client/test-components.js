var React = require("react");
var shallow = require("enzyme").shallow;
var expect = require("chai").expect;
var should = require("chai").should();

var App = require("../../client/js/components/app");
var AppWrapper = shallow(<App />);
describe("App component", function() {
	it("should render", function() {
		AppWrapper.should.have.length(1);
	});
});

