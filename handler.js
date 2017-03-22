var fs = require('fs');
var chat = require('./chat');

function handler(request, response) {


    //debugger;
    var url = request.url;
    switch(request.url) {
        case '/':
            sendFile('index.html', response);
            break;
        case '/subscribe':
            //

            chat.subscribe(request, response);

            break;
        case '/publish':
            //
            var body = '';

            request.on('readable', function() {

                try {

                    var slice = request.read();
                    body += slice ? slice : '';



                    if(body.length > 50) {
                        response.statusCode = 413;
                        //chat.deleteResponse(response);
                        //body = '';
                        response.end('Your message is too big for little chat');
                    }


                } catch(error) {
                    console.error(error);
                }
            });

            request.on('end', function (error) {
                if(response.finished) {
                    console.log('ololo');
                    return;
                }

                try {
                    debugger;
                    body = JSON.parse(body);
                }
                catch(error) {
                    console.log('Body ' + body);
                    console.error(error);
                }

                chat.publish(body.message);
                response.end('Ok');
            });
            break;
        default:
            response.statusCode = 404;
            response.end('Page not found');
    }
}

function sendFile(fileName, response) {

    throw new Error('Some error');

    var fileStream = fs.createReadStream(fileName);
    // error

    fileStream.on('error', function() {
        response.statusCode = 500;
        response.end('Server error');
    });
    fileStream.pipe(response);
}

module.exports = handler;