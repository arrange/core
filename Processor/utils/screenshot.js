var fs = require('fs');
var webshot = require('webshot');

function capture(source, destination) {
    // if (!fs.existsSync(source)) {
    //     console.error('could not find file specified!');
    //     return false;
    // }
    webshot(source, destination, {
        siteType: 'url'
    }, function(err) {
        if (err) {
            console.log(err);
        }
    });
    return true;
}


module.exports = capture;
