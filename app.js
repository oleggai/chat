
var domain = require('domain');
var serverDomain =  domain.create();
var server;
serverDomain.on('error', function(error) {
    console.log('Домен перехватил %s', error);

});

serverDomain.run(function() {
    var http = require('http');
    var handler = require('./handler');
    server = new http.Server();
    server.listen(1337, '127.0.0.1');
    server.on('request', function(request, response) {

        var domainRequest = domain.create();

        domainRequest.add(request);
        domainRequest.add(response);

        domainRequest.on('error', function(error) {
            response.statusCode = 500;
            response.end('Sorry! Server error ' + error);
            serverDomain.emit('error', error);
        });

        domainRequest.run(function() {
            handler(request, response);
        });

    });
});