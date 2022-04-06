const gulp = require("gulp");
const dartSass = require("sass")
const sass = require("gulp-sass")(dartSass);
const browserSync = require("browser-sync");

function scss() {
    return gulp.src("./style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: { baseDir: './' },
        notify: false,
        port: 3000
    })
    gulp.watch("./style.scss", scss)
    gulp.watch("./index.html").on("change", browserSync.reload)
}

gulp.task("default", gulp.series(scss, watch))
