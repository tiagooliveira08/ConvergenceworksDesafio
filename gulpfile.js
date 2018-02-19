"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const watch = require("gulp-watch");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync");
const autoprefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("sass", () => (
    gulp.src("./src/scss/components/style.scss")
    .pipe(sass({
        outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefix({
        browsers: ["last 2 versions"],
        cascade: false
    }, ))
    .pipe(gulp.dest("./public/css/main/"))
    .pipe(browserSync.reload({
        stream: true
    })).on("finish", () => console.log("Css Atualizado com sucesso!!"))
));


gulp.task("compress-javascript", () => (
    gulp.src("./src/js/*.js")
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify().on("error", e => console.log(e)))
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.reload({
        stream: true
    }))
));

gulp.task("compress-image", () => (
    gulp.src("./src/img/**")
    .pipe(imagemin([
        imagemin.jpegtran({
            progressive: true
        }),
        imagemin.optipng({
            optimizationLevel: 5
        }),
        imagemin.gifsicle({
            plugins: [{
                intercaled: true
            }]
        })
    ]))
    .pipe(gulp.dest("./public/img"))
    .pipe(browserSync.reload({
        stream: true
    }))
));

gulp.task("server", ["sass"], () => {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    })

    gulp.watch("public/*.html").on("change", browserSync.reload);
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch("src/js/script.js", ["compress-javascript"]);
});

gulp.task("build", ["sass", "compress-image", "compress-javascript"]);

gulp.task("default", ["server"]);