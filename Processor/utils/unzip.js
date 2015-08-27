var fs = require('fs');
var unzip = require('unzip');

function Unzip(source, destination) {
    if (!fs.existsSync(source)) {
        console.error('could not find file specified!');
        return false;
    }
    var readStream = fs.createReadStream(source);
    readStream
        .pipe(unzip.Extract({
            path: destination
        }));

    return true;
}


module.exports = Unzip;
