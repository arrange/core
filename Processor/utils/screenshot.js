var fs = require('fs');
var webshot = require('webshot');

function capture(source, destination) {
    // if (!fs.existsSync(source)) {
    //     console.error('could not find file specified!');
    //     return false;
    // }   
    console.log(source);
    console.log(destination);
    webshot(source, destination, {
        siteType: 'url',
        defaultWhiteBackground: true
    }, function(err) {
        if (err) {
            console.log(err);
        }
    });
    return true;
}


module.exports = capture;
