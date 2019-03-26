var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlify = require('gulp-angular-htmlify'),
    zip = require('gulp-zip'),
    gzip = require('gulp-gzip'),
    gulpSequence = require('gulp-sequence'),
    htmlmin = require('gulp-htmlmin'),
    deletefile = require('gulp-delete-file'),
    minifyCSS = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    babel = require('gulp-babel'),
    versionate = require('gulp-version-filename'),
    browserSync = require('browser-sync').create(),
    gutil = require( 'gulp-util' ),
    templateCache = require('gulp-angular-templatecache');

gulp.task('copyPhpFiles', function() {
    gulp.src([
        '**/*',
        '!{node_modules,node_modules/**}',
        '!{dist,dist/**}',
        '!Gulpfile.js',
        '!package.json',
        '!package-lock.json',
        '!.gitignore',
        '!README.md'
    ])
    // Perform minification tasks, etc here
    .pipe(gulp.dest('C:/xampp/htdocs/1-ISNTANPACK/ics-taxes-app/dist'));
});

gulp.task('project_compress_img', function() {
    console.warn('comprimendo imagenes');
    return gulp.src('imagen/**/*')
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('dist/imagen'));
});

gulp.task('project_minify_html', function() {
    return gulp.src(['templates/**/*.html'])
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true}))
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('project_transpile_js', function () {
    return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(babel({
            "presets": ["env"],
            "plugins": [/*"transform-runtime","transform-async-to-generator","syntax-async-functions","transform-regenerator","async-to-promises"*/]
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('project_minify_js', function() {
    console.log('minifying js ...');
    return gulp.src(['dist/js/**/*.js', '!dist/js/**/*.min.js'])
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('project_minify_css', function ()
{
    console.log('minifying css ...');
    return gulp.src(['dist/**/*.css', '!dist/**/*.min.css'])
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('dist'))
});
//execute this task for deployment to prod isn suite..
gulp.task('build', function(callback) {
  runSequence('copyPhpFiles','project_compress_img','project_minify_html',
        'project_transpile_js','project_minify_js', 'project_minify_css',
        'project_transpile_js', 'project_minify_js', 'project_minify_css',callback);
});

gulp.task('ics_taxes_build',
    gulpSequence('copyPhpFiles','project_compress_img','project_minify_html',
        'project_transpile_js','project_minify_js', 'project_minify_css',
        'project_transpile_js', 'project_minify_js', 'project_minify_css'));