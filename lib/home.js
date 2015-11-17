exports.register = function (server, options, next) {

  server.route([{
    method: 'GET',
    path: '/',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {
        var url = server.generate_google_oauth2_url();
        return reply.view('home', {url: url});
      }
    }
  }]);
  return next();
}

exports.register.attributes = {
  name: 'Home'
};
