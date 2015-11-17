exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/private',
      config: {
        description: 'return a private page',
        handler: function (request, reply) {
          reply('This is a private page');
        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Private'
}
