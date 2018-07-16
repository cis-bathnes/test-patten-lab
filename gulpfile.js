const assembler = require('fabricator-assemble');
const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const rmLines = require('gulp-rm-lines');
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');

// configuration
const config = {
  dev: gutil.env.dev,
  serve: true,
  styles: {
    browsers: 'last 1 version',
    ui: {
      src: 'src/assets/ui/styles/ui.scss',
      dest: 'dist/assets/ui/styles',
      watch: 'src/assets/ui/styles/**/*.scss',
    },
    patterns: {
      src: 'src/assets/patterns/styles/screen.scss',
      dest: 'dist/assets/patterns/styles',
      watch: 'src/assets/patterns/styles/**/*.scss',
    },
    duplicates: {
      src: 'govuk_frontend_toolkit/stylesheets/design-patterns/**/*',
      dest: 'src/assets/patterns/styles/design-patterns',
    },
  },
  scripts: {
    ui: {
      src: './src/assets/ui/scripts/ui.js',
      dest: 'dist/assets/ui/scripts',
      watch: 'src/assets/ui/scripts/**/*',
    },
    patterns: {
      src: './src/assets/patterns/scripts/app.js',
      dest: 'dist/assets/patterns/scripts',
      watch: 'src/assets/patterns/scripts/**/*',
    },
  },
  images: {
    patterns: {
      src: ['src/assets/patterns/images/**/*', 'src/favicon.ico', 'govuk_frontend_toolkit/images/**/*'],
      dest: 'dist/assets/patterns/images',
      watch: 'src/assets/patterns/images/**/*',
    },
  },
  templates: {
    watch: 'src/**/*.{html,md,json,yml}',
  },
  dest: 'dist',
};


// clean
gulp.task('clean', del.bind(null, [config.dest]));


// styles
gulp.task('styles:ui', () => {
  gulp.src(config.styles.ui.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix(config.styles.browsers))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(rename('ui.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.styles.ui.dest))
  .pipe(gulpif(config.serve, reload({ stream: true })));
});

// duplicate the required files, stripping imports
gulp.task('styles:duplicates', () => {
  return gulp.src(config.styles.duplicates.src)
  .pipe(rmLines({
      'filters': [
        /^@import/,
      ]
    }))
  .pipe(gulp.dest(config.styles.duplicates.dest));
});

gulp.task('styles:patterns', () => {
  gulp.src(config.styles.patterns.src)
  .pipe(gulpif(config.dev, sourcemaps.init()))
  .pipe(sass({
    includePaths: [
        './node_modules'
    ]
  }).on('error', sass.logError))
  .pipe(prefix(config.styles.browsers))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(gulpif(config.dev, sourcemaps.write()))
  .pipe(gulp.dest(config.styles.patterns.dest))
  .pipe(gulpif(config.serve, reload({ stream: true })));
});

gulp.task('styles', () => {
  runSequence(
    'styles:ui',
    'styles:duplicates',
    'styles:patterns'
  );
});

// scripts
const webpackConfig = require('./webpack.config')(config);

gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err()));
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach((error) => {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});


// images
gulp.task('images', ['favicon'], () => {
  return gulp.src(config.images.patterns.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.patterns.dest));
});

gulp.task('favicon', () => {
  return gulp.src('src/favicon.ico')
  .pipe(gulp.dest(config.dest));
});


// assembler
gulp.task('assembler', (done) => {
  assembler({
    logErrors: config.dev,
    dest: config.dest,
  });
  done();
});


// server
gulp.task('serve', () => {

  browserSync({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    logPrefix: 'FABRICATOR',
  });

  gulp.task('assembler:watch', ['assembler'], browserSync.reload);
  gulp.watch(config.templates.watch, ['assembler:watch']);

  gulp.task('styles:watch', ['styles']);
  gulp.watch([config.styles.ui.watch, config.styles.patterns.watch], ['styles:watch']);

  gulp.task('scripts:watch', ['scripts'], browserSync.reload);
  gulp.watch([config.scripts.ui.watch, config.scripts.patterns.watch], ['scripts:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.images.patterns.watch, ['images:watch']);

});


// default build task
gulp.task('default', ['clean'], () => {

  // define build tasks
  const tasks = [
    'styles',
    'scripts',
    'images',
    'assembler',
  ];

  // run build
  runSequence(tasks, () => {
    if (config.serve) {
      gulp.start('serve');
    }
  });

});
