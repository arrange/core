var http = require('http');
var url = require('url');
var unzipper = require('./utils/unzip');
var coffeeProcessor = require('./utils/coffee');
var screenshot = require('./utils/screenshot');
http.createServer(function(req, res) {
    console.log(req.url);
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.mode == 'unzip') {
        unzipper(query.input, query.output);
    } else if (query.mode == 'coffee') {
        coffeeProcessor(query.input, query.output);
    } else if (query.mode == 'screenshot') {
        screenshot(query.input, query.output);
    }
    res.end(JSON.stringify({
        success: 1,
        message: 'operation completed!'
    }));
}).on('error', function(err) {
    console.log(err.stack);
    res.end(JSON.stringify({
        success: 0,
        message: err.stack
    }));
}).listen(5000);
