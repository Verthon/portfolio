
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src",

    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("/*.html").on('change', browserSync.reload);
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('src/assets'))
  })
  
  // Move Font Awesome CSS to src/css
  gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest('src/css'))
  })

// Default Task
gulp.task('default', ['serve', 'fonts']);