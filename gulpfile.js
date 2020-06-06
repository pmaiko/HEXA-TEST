var gulp = require('gulp');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var bro = require('gulp-bro');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

var connect = require('gulp-connect-php');
var browserSync = require('browser-sync').create();

var jsFilesList = ["./assets/js/main.js", ];

function style(done) {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());

    done();

}

function js(done) {
    gulp.src(jsFilesList)
        .pipe(bro({ transform: [babelify.configure({ presets: ['@babel/preset-env'] })]}))
        .pipe(sourcemaps.init())
        // .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(browserSync.stream());


    done();

}

function browserReload(done) {
    browserSync.reload();
    done();
}

function sync(done) {
    connect.server({}, function (){
        browserSync.init({
            proxy:"localhost:8000",
            baseDir: "./",
            open:true,
            notify:false
        });
    });

    done();
}

function watch() {
    gulp.watch('./assets/scss/**/*', style);
    gulp.watch(jsFilesList, js);

    gulp.watch('./**/*.php', browserReload);
    gulp.watch('./**/*.html', browserReload);
}

gulp.task('default', gulp.parallel(sync, style, js, watch)) ;
