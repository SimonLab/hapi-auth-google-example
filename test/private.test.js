var Server = require('../lib/server.js');
var JWT = require('jsonwebtoken');
var test = require('tape');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";
var fs = require('fs');
var redisClient = require('redis-connection')();

test(file+'Visit /private without a JWT cookie', function(t) {

  var options = {
    method: "GET",
    url: "/private"
  };

  Server.init(0, function (err, server) {
    server.inject(options, function(response) {
      t.equal(response.statusCode, 401, "endpoint /private 401 not Authorized.");
      server.stop(t.end);
    });
  })

});

test("Attempt to access restricted content with WRONG Token", function(t) {
  var token =  "wrongeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXN0bmFtZSI6IkFsZXgiLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnP3N6PTUwIiwiaWQiOiIxMDA3NjAxNTIyNTQ3NzkwNjE1OTQiLCJhZ2VudCI6InNob3QiLCJpYXQiOjE0NDc4NTA0NjN9.zcimChNyt0xjig1gtcRjk3neyXBaB3TP5KD-B1Tcxy8"  //JWT.sign({ id: 123, "name": "Charlie" }, secret);
  var options = {
    method: "GET",
    url: "/private",
    headers: { cookie: "token=" + token }
  };
  // server.inject lets us similate an http request
  Server.init(0, function (err, server) {
    server.inject(options, function(response) {
      t.equal(response.statusCode, 401, "Wrong Token !");
      server.stop(t.end);
    });
  })
});

test("Attempt to access restricted content with WRONG Token", function(t) {

  redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    var options = {
      method: "GET",
      url: "/private",
      headers: { cookie: "token=" + token }
    };
    // server.inject lets us similate an http request
    Server.init(0, function (err, server) {
      server.inject(options, function(response) {
        t.equal(response.statusCode, 200, "Valid Token !");
        server.stop(function(){
        });
        t.end();
      });
    })
  });
});

test("Attempt to access restricted content with WRONG Token", function(t) {

  redisClient.set(123, JSON.stringify({ id: 123, "name": "Charlie", valid: false}), function (err, res) {

    var token =  JWT.sign({ id: 123, "name": "Charlie"}, process.env.JWT_SECRET);
    var options = {
      method: "GET",
      url: "/private",
      headers: { cookie: "token=" + token }
    };
    // server.inject lets us similate an http request
    Server.init(0, function (err, server) {
      server.inject(options, function(response) {
        t.equal(response.statusCode, 401, "Invalid Token !");
        server.stop(function(){
          redisClient.end();
        });
        t.end();
      });
    })
  });
});

//id not find in redis!
test("Attempt to access restricted content with WRONG Token", function(t) {
  var token =  JWT.sign({ id: 42, "name": "Charlie"}, process.env.JWT_SECRET);
  var options = {
    method: "GET",
    url: "/private",
    headers: { cookie: "token=" + token }
  };
  // server.inject lets us similate an http request
  Server.init(0, function (err, server) {
    server.inject(options, function(response) {
      t.equal(response.statusCode, 401, "Invalid Token !");
      server.stop(t.end);
    });
  })
});
