require('env2')('.env');
var googleAuthHandler = require('../lib/google_oauth_handler');
var test = require('tape');
var Server = require('../lib/server.js');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";
var fs = require('fs');
var nock = require('nock');


console.log(process.env.JWT_SECRET);

test(file+'Visit / root url expect to see a link', function(t) {

  var options = {
    method: "GET",
    url: "/"
  };

  Server.init(0, function (err, server) {
    server.inject(options, function(response) {
      t.equal(response.statusCode, 200, "Server is working.");
      server.stop(t.end);
    });
  })

});

// test a bad code does not crash the server!
test('/googleauth?code=oauth2codehere', function(t) {

  var options = {
    method: "GET",
    url: "/googleauth?code=badcode"
  };

  Server.init(0, function(err, server) {
    server.inject(options, function(response) {
    t.equal(response.statusCode, 200, "Try to get a google token with a bad code");
    t.ok(response.payload.indexOf('something went wrong') > -1,
          'Got: '+response.payload + ' (As Expected)');
    server.stop(t.end);
    });
  })
});

test('Mock /googleauth?code=oauth2codehere', function(t) {
  // google oauth2 token request url:

  var token_fixture = fs.readFileSync('./test/fixtures/sample-auth-token.json');

  var scope = nock('https://accounts.google.com')
            .persist() // https://github.com/pgte/nock#persist
            .post('/o/oauth2/token')
            .reply(200, token_fixture);

  // see: http://git.io/v4nTR for google plus api url
  // https://www.googleapis.com/plus/v1/people/{userId}
  var sample_profile = fs.readFileSync('./test/fixtures/sample-profile.json');

  var scope = nock('https://www.googleapis.com')
            .get('/plus/v1/people/me')
            .reply(200, sample_profile);

  var options = {
    method: "GET",
    url: "/googleauth?code=myrandomtoken"
  };

  Server.init(0, function(err, server) {

    server.inject(options, function(response) {

      t.equal(response.statusCode, 200, "Get a google token with a right code");
      var expected = 'Hello Alex You Logged in Using Goolge!';
      t.equal(response.payload, expected, "")
      console.log(' - - - - - - - - - - - - - - - - - -');
      console.log(response.payload);
      console.log(' - - - - - - - - - - - - - - - - - -');
      server.stop(function(){
        //get the redis connection and close it
        var redisClient = require('redis-connection')();
        redisClient.end();
        //googleAuthHandler.redisClient.end();
        //validate.redisClient.end();
        t.end();
      });
    });
  });
});
