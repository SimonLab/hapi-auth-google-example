var JWT = require('jsonwebtoken'); // session stored as a JWT cookie
var RedisClient = require('redis-connection')();

module.exports = function custom_handler(req, reply, tokens, profile) {
  if(profile) {
    // extract the relevant data from Profile to store in JWT object
    var session = {
      fistname : profile.name.givenName, // the person's first name e.g: Anita
      image    : profile.image.url,      // profile image url
      id       : profile.id,             // google+ id
      exp      : Math.floor(new Date().getTime()/1000) + 7*24*60*60, // Epiry in seconds!
      agent    : req.headers['user-agent']
    }
    // create a JWT to set as the cookie:

    var jwt = JWT.sign(session, process.env.JWT_SECRET);
    // store the Profile and Oauth tokens in the Redis DB using G+ id as key
    // Detailed Example...? https://github.com/dwyl/hapi-auth-google/issues/2
    profile.tokens = tokens;
    RedisClient.set(session.id, JSON.stringify(profile), function (err, res) {
      // reply to client with a view
      return reply("Hello " +profile.name.givenName + " You Logged in Using Goolge!")
      .state('token', jwt); // see: http://hapijs.com/tutorials/cookies
    });

  }
  else {
    return reply("Sorry, something went wrong, please try again.");
  }
}
