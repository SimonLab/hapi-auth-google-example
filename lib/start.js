require('env2')('.env');
var server = require('./server.js');
server.init(process.env.PORT, function(err, server){
  console.log('The server is running on ' + server.info.uri);
});
