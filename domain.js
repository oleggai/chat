
var domain = require('domain');

var domainServer = domain.create();

domainServer.on('error', function(error) {
    console.log('Домен перехватил %s', error);
});

domainServer.run(function() {
    domainServer.add(ERROR());
});