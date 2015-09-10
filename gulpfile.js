var gulp = require("gulp");
var browserify = require("gulp-browserify");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");

gulp.task("browserify", function(){
  gulp.src("src/javascripts/main.js")
      .pipe(plumber())
      .pipe(browserify({ debug: true }))
      .pipe(concat("main.js"))
      .pipe(gulp.dest("public/javascripts"));
});

gulp.task("default", ["browserify"]);

gulp.task("watch", function(){
  gulp.watch("src/**/**/*.*", ["default"]);
});