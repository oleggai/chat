
var clients = [];

exports.subscribe = function(request, response) {
    console.log('Subscribe new client');

    clients.push(response);

    response.on('close', function() {
        try {
            clients.splice(clients.indexOf(response), 1);
        } catch (error) {
            console.error(error);
        }
    });
};

exports.deleteResponse = function(response) {
    clients.splice(clients.indexOf(response), 1);
};

exports.publish = function(message) {
    //debugger;
    console.log('Publish new message:  %s', message);

    clients.forEach(function(response) {
        response.end(message);
    });
    clients = [];
};
/*

setInterval(function() {
    console.log(clients.length);
}, 2000);*/
