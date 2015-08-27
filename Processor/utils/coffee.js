var fs = require('fs');
var gulp = require('gulp');
var coffee = require('gulp-coffee');

function coffeeProcessor(source, destination) {
    if (!fs.existsSync(source)) {
        console.error('could not find file specified!');
        return false;
    }
    gulp.src(source + '/*.coffee')
        .pipe(coffee({
            bare: true
        }).on('error', console.log))
        .pipe(gulp.dest(destination));
    return true;
}


module.exports = coffeeProcessor;
