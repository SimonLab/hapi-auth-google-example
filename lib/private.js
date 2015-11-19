exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/private',
      config: {
        description: 'return a private page',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: function (request, reply) {
          if(!request.auth.isAuthenticated) {
            return reply.redirect('/');
          } else {
            return reply('You are on the private page');
          }
        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Private'
}
