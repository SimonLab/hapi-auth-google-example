var Server = require('../lib/server.js');
var test = require('tape');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";
var fs = require('fs');

test(file+'Visit / root url expect to see a link', function(t) {

  var options = {
    method: "GET",
    url: "/private"
  };

  Server.init(0, function (err, server) {
    server.inject(options, function(response) {
      t.equal(response.statusCode, 200, "endpoint /private is working.");
      server.stop(t.end);
    });
  })

});
