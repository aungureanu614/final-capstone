global.DATABASE_URL = 'mongodb://localhost/test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../../server/index');
var app = server.app;

var Record = require("../../server/models/record");

chai.use(chaiHttp);

describe('Server app', function() {
  before(function(done) {
    server.runServer(function() {
      Record.create({field: "Hello world"}, function(err, record) {
        if (err) {
          console.error(err);
        }
        done();
      });
    });
  });

  it("should send 200 and 'Hello world' on simple GET to root route", function(done) {
    chai.request(app)
    .get("/")
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.message.should.equal("Hello world");
      done();
    });
  });

  it("should connect to the database", function(done) {
    Record.find(function(err, records) {
      if (err) {
        console.error(err);
      }
      records[0].field.should.equal("Hello world");
      done();
    });
  });



});


