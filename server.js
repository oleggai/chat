
var http = require('http');
var server = new http.Server();

var handler = require('./handler');

server.on('request', handler);

module.exports = server;