var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

var path = {
  JS: './public/js/src/index.jsx',
  OUT: 'index.js',
  DEST_BUILD: 'public/js/build/',
  DEST_SRC: 'public/js/src/*.jsx'
};

gulp.task('js', function(){
    browserify(path.JS)
        .transform(reactify)
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function() {
    gulp.watch(path.DEST_SRC, ["js"])
})

gulp.task('default', ['js', 'watch']);