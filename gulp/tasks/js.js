import webpack from "webpack-stream"

export const js = () => {
   const entry = {
     app: './src/js/app.js',
     game2048: './src/js/modules/2048/2048.js',
     spidey: './src/js/modules/spidey.js',
   };

   return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "js",
            message: "Error: <%=error.message %>"
         })
      ))
      .pipe(webpack({
         mode: app.isBuild ? 'production' : 'development',
         entry: entry,
         output: {
            filename: '[name].min.js',
         }
      }))
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream());
}