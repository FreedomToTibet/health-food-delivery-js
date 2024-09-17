"use strict";

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");


const dist = "./dist/";
// const dist = "c:/Users/LEGION/OneDrive/Документы/IT/OpenServer/domains/test";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
								.pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task('styles', function() {
		return gulp.src("src/assets/scss/**/*.scss")
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.init())
				.pipe(postcss([ autoprefixer() ]))
				.pipe(csso())
				.pipe(concat('style.min.css'))
				.pipe(sourcemaps.write("./"))
				.pipe(gulp.dest(`${dist}/css`))
				.pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(`${dist}/js`))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    gulp.src("./src/assets/icons/**/*.*")
    	.pipe(gulp.dest(dist + "/assets/icons"));
    return gulp.src("./src/assets/img/**/*.*")
			.pipe(gulp.dest(dist + "/assets/img"));
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/assets/scss/**/*.scss", gulp.parallel("styles"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "styles"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));