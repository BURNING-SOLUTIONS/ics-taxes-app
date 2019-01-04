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
    babel = require('gulp-babel'),
    versionate = require('gulp-version-filename'),
    browserSync = require('browser-sync').create(),
    gutil = require( 'gulp-util' ),
    templateCache = require('gulp-angular-templatecache');

    /*ftp = require( 'vinyl-ftp' ),
    tap               = require('gulp-tap'),
    path              = require('path'),
    newfile           = require('gulp-file'),

    /!** Configuration FTP **!/
    user = "publico.jccm.es", //process.env.FTP_USER,
    password = "", //process.env.FTP_PWD,
    host = "publico.jccm.es", // 'your hostname or ip address',
    port = 21,
    localFilesGlob = ['./!**!/!*'],
    remoteFolder = '/',

    reload = browserSync.reload;*/

// helper function to build an FTP connection based on our configuration
/*function getFtpConnection() {
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}*/


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
    return gulp.src(['templates/*.html'])
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
    return gulp.src(['dist/js/**/*.js', '!js/**/*.min.js'])
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
gulp.task('ics_taxes_build',
    gulpSequence('copyPhpFiles','project_compress_img','project_minify_html','project_transpile_js', 'project_minify_js', 'project_minify_css','project_transpile_js', 'project_minify_js', 'project_minify_css'));

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
/*gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files
        .pipe( conn.dest( remoteFolder ));
});


gulp.task('html', () => {
    return gulp.src('src/!**!/!*.html')
        .pipe($.htmlmin({collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true}))
        .pipe($.versionNumber(versionConfig))
        .pipe(gulp.dest('docroot'));
});

gulp.task('default', function() {
    console.log('Hello world!');
});

gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: './'
    });
    gulp.watch("apps/!**!/!*.css").on("change", browserSync.reload({stream: true}));
    gulp.watch("apps/!**!/!*.js").on("change", browserSync.reload({stream: true}));
    gulp.watch("apps/!**!/!*.html").on("change", browserSync.reload({stream: true}));
});*/

/*gulp.task('transpile', function () {
    return gulp.src('src/app.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('transpile2', () =>
    gulp.src('apps/!**!/!*.js')
        .pipe(babel({
            "presets": ["env"],
            "plugins": ["transform-runtime","transform-async-to-generator","syntax-async-functions","transform-regenerator","async-to-promises"]
        }))
        .pipe(gulp.dest('dist'))
);*/
//-----------------------------------------------------------

/*gulp.task('isn_compress_img', function() {
    console.warn('comprimendo imagenes');
    return gulp.src('apps/!**!/!*.png')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('EC5-COMPILED/apps'));
});

gulp.task('isn_assets_compress_img', function() {
    return gulp.src('assets/!**!/!*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('EC5-COMPILED/assets'));
});

gulp.task('isn_minify_html', function() {
    return gulp.src(['apps/!**!/!*.html'])
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true}))
        .pipe(gulp.dest('EC5-COMPILED/apps'));
});*/

/*gulp.task('isn_common_minify_html', function() {
    return gulp.src(['common/!**!/!*.html'])
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true}))
        .pipe(gulp.dest('EC5-COMPILED/common'));
});*/

//la tisa cojone----------------------------
/*gulp.task('indexScalfolding', function () {
    //console.warn(path.dirname())
    return gulp.src('EC5-COMPILED/index.html')//'*.html'
        .pipe(useref())
        .pipe(gulpif('*.js', uglify({
                compress: {
                    drop_console: true
                }
            })
        ))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulp.dest('EC5-COMPILED/'));
});

gulp.task('versionateJs', function() {
    return gulp.src(['EC5-COMPILED/dist/scripts/!**!/!*.js'])
        .pipe(versionate({
            silent: true,
        }))
        .pipe(gulp.dest('EC5-COMPILED/dist/scripts'))
});*/

//Minificando assets js..
/*gulp.task('minifyAssetsJs', function() {
    console.log('minifying js ...');
    return gulp.src('EC5-COMPILED/assets/!**!/!*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('EC5-COMPILED/assets'));
});

//Minificando assets css..
gulp.task('minifyAssetsCss', function ()
{
    gulp.src('EC5-COMPILED/assets/!**!/!*.css')
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('EC5-COMPILED/assets'))
});

gulp.task('dbmJsAssetsDeploy', function() {
    return gulp.src(
        [
            'EC5-COMPILED/assets/global/plugins/typeahead/handlebars.min.js',
            'EC5-COMPILED/assets/global/plugins/typeahead/typeahead.bundle.min.js',
            'EC5-COMPILED/assets/polyfill.min.js', 'EC5-COMPILED/assets/layouts/layout6/scripts/layout.js',
            'EC5-COMPILED/assets/global/plugins/jquery-quicksearch/jquery.quicksearch.js',
            'EC5-COMPILED/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
            'EC5-COMPILED/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/img/ng-img-crop.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/img/ng-jcrop.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/multi-select/angular-tree-view.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/multi-select/angular-dual-multi-select.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/ui-listView/ui-listView.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/tags/ng-tags-input.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/callendar/fullcalendar.js',
            'EC5-COMPILED/assets/global/plugins/angularjs/plugins/callendar/calendar.js'
        ])
        .pipe(concat('dbm.min.js'))
        .pipe(gulp.dest('EC5-COMPILED/scripts/dbm'))
        .pipe(rename('dbm.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('EC5-COMPILED/scripts/dbm'));
});
gulp.task('dbmCssAssetsDeploy', function() {
    return gulp.src(
        [
            'assets/layouts/layout6/css/custom.css',
            'assets/layouts/layout6/css/layout.css',
            'assets/global/css/spinners.css',
            'assets/global/plugins/datatables/datatables.min.css',
            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
            'assets/global/plugins/angularjs/plugins/multi-select/angular-tree-view.min.css',
            'assets/global/plugins/angularjs/plugins/multi-select/angular-dual-multi-select.css',
            'assets/global/plugins/angularjs/plugins/ui-listView/ui-listView.css',
            'assets/global/plugins/typeahead/typeahead.css',
            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
            'assets/global/plugins/angularjs/plugins/img/ng-img-crop.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog-custom-width.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog-theme-plain.css',
            'assets/global/plugins/angularjs/plugins/tags/ng-tags-input.css',
            'assets/global/plugins/angularjs/plugins/tags/ng-tags-input.bootstrap.css',
            'assets/global/plugins/angularjs/plugins/passwords/main.css',
            'assets/global/plugins/angularjs/plugins/callendar/fullcalendar.min.css',
        ])
        .pipe(concat('dbm.min.css'))
        .pipe(gulp.dest('EC5-COMPILED/css/dbm'))
        .pipe(rename('dbm.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('EC5-COMPILED/css/dbm'));
});
gulp.task('websiteJsAssetsDeploy', function() {
    return gulp.src(
        [
            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'assets/global/plugins/counterup/jquery.counterup.min.js',
            'assets/global/plugins/counterup/jquery.waypoints.min.js',
            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
            'assets/global/plugins/angularjs/plugins/date-picker/mdr-datepicker.min.js',
            'assets/layouts/layout5/scripts/layout.js',
            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'assets/global/plugins/typeahead/handlebars.min.js',
            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
            'assets/global/plugins/angularjs/plugins/materialize-tags/js/materialize-tags.min.js',
        ])
        .pipe(concat('website.min.js'))
        .pipe(gulp.dest('EC5-COMPILED/scripts/website'))
        .pipe(rename('website.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('EC5-COMPILED/scripts/website'));
});
gulp.task('websiteCssAssetsDeploy', function() {
    return gulp.src(
        [
            'assets/global/plugins/typeahead/typeahead.css',
            'assets/global/plugins/angularjs/plugins/materialize-tags/css/materialize-tags.min.css',
            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css',
            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog-custom-width.css',
            'assets/global/plugins/angularjs/plugins/ngDialog-master/ngDialog-theme-plain.css',
            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css'
        ])
        .pipe(concat('website.min.css'))
        .pipe(gulp.dest('EC5-COMPILED/css/website'))
        .pipe(rename('website.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('EC5-COMPILED/css/website'));
});*/


//execute this task for minify all html and img for isn-suite..
/*gulp.task('compress-img-html', ['isn_compress_img','isn_assets_compress_img','isn_minify_html','isn_common_minify_html'],
    function() {
        console.log('Executing gulp...');
    });

//execute this task for compress isn code js and all assest js and css..
gulp.task('compress-js-css',
    [
        'indexScalfolding','versionateJs','minifyAssetsJs','minifyAssetsCss',
        'dbmJsAssetsDeploy', 'dbmCssAssetsDeploy', 'websiteJsAssetsDeploy',
        'websiteCssAssetsDeploy'
    ],
    function() {
        console.log('Executing gulp js-css minify...');
    });

gulp.task('copy-index-html', function() {
    gulp.src('index.html')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('EC5-COMPILED/'));
});

gulp.task('copy-version-file', function() {
    gulp.src('config/version.json')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('EC5-COMPILED/config'));
});

gulp.task('copyFonts', function() {
    gulp.src('assets/icons-isn/fonts/!**!/!*')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('EC5-COMPILED/css'));
});

gulp.task('copy-datatables-js', function() {
    gulp.src('assets/global/plugins/datatables/!**!/!*')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('EC5-COMPILED/assets/global/plugins/datatables'));
});

gulp.task('copy-uploadplugin', function() {
    gulp.src('assets/global/plugins/angularjs/plugins/img/angular-file-upload.js')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('EC5-COMPILED/assets/global/plugins/angularjs/plugins/img/'));
});

gulp.task('copyRelease', function() {
    gulp.src('EC5-COMPILED/!**!/!*')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('C:/xampp/htdocs/RELEASE'));
});

gulp.task('deleteMapFiles', function () {
    var regexp = /\w*(\-\w{8}\.map){1}$/;
    gulp.src(['C:/xampp/htdocs/RELEASE/!**!/!*.map',
    ]).pipe(deletefile({
        reg: regexp,
        deleteMatch: false
    }))
});

gulp.task('generateRarRelease', () =>
    gulp.src('C:/xampp/htdocs/RELEASE/!**!/!*')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest('C:/xampp/htdocs/RELEASE'))
);

gulp.task('templatecache', function () {
    return gulp.src('EC5-COMPILED/apps/!**!/!*.html')
        .pipe(templateCache({root: 'apps/'}))
        .pipe(gulp.dest('EC5-COMPILED/public_cache'));
});

//execute this task for deployment to prod isn suite..
gulp.task('isn-build',
    gulpSequence('copy-index-html','copy-version-file','compress-img-html','compress-js-css', 'copy-datatables-js',
        'copy-uploadplugin','copyFonts', 'copyRelease','deleteMapFiles'/!*, 'templatecache'*!/ /!*'generateRarRelease'*!/));*/

// gulp.task('isn-build', gulpSequence('copy-index-html','compress-img-html','compress-js-css'),
//     function() {
//       console.log('Executing gulp js-css minify...');
// });
//https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/

//##############################################################################################################
//poniendo las plantillas de apps en $templatecache para optimizar carga de htmls cuando recargen paginas
/*gulp.task('apps_templatecache', function () {
    return gulp.src(['dist/!********!/!*****!/!******!/!**!/!*.html'])
        .pipe(templateCache())
        .pipe(gulp.dest('dist/templates-cache'));
});

//poniendo las plantillas de common en $templatecache para optimizar carha de htmls cuando recargen paginas
gulp.task('apps_templatecache_common', function () {
    return gulp.src(['dist/common/!**!/!*.html'])
        .pipe(templateCache())
        .pipe(gulp.dest('dist/templates-cache-common'));
});*/

//##############################################################################################################

//Minificando todo el codigo que tire en ISN las capetas apps y common
/*gulp.task('minifyAllIsnJs', function() {
    console.log('minifying js ...');
    return gulp.src(['EC5-COMPILED/apps/!**!/!*.js', 'EC5-COMPILED/common/!**!/!*.js'])
    /!*.pipe(concat('app_isn.min.js'))*!/
        .pipe(ngAnnotate())
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('EC5-COMPILED/dist/js'));
});*/

/*gulp.task('css', ['sass'], function() {
    return gulp.src('src/assets/css/!*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(uncss({
            html: ['src/!*.html']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/assets/css'));
});


//Minificando assets html..
gulp.task('minifyAssetsHtml', function() {
    return gulp.src('assets/!**!/!*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true}))
        .pipe(gulp.dest('dist/assets'));
});*/


//PRUEBAS
//------------------------------------------------------
/*gulp.task('annotate', function () {
    return gulp.src('apps/!**!/!*.js')
        .pipe(ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest('EC5-COMPILED/apps/'));
}); */                       //END//
//------------------------------------------------------
