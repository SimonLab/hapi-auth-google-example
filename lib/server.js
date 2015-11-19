var Hapi = require('hapi');
var Home = require('./home.js')
var HapiAuthGoogle = require('hapi-auth-google');
var Vision = require('vision');
var Handlebars = require('handlebars');
var validate = require('./validate');
var HapiAuthJWT =  require('hapi-auth-jwt2');
var Private = require('./private.js');
var Authentication = require('./authentication');

exports.init = function (port, next) {
  // var redisClient = require('redis-connection');
  var server = new Hapi.Server();
  server.connection({port: port});
  var opts = { REDIRECT_URL: '/googleauth',
             scope: 'https://www.googleapis.com/auth/plus.profile.emails.read',
             handler: require('./google_oauth_handler.js') };

  server.register([{register: HapiAuthGoogle, options: opts}, Authentication, Private, Home, Vision], function (err) {

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views/',
      path: '.',
      layout: 'default',
      layoutPath: 'layout'
    });
    server.start(function (err) {

      return next(err, server);
    });
  });
};
