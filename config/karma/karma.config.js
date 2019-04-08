// Karma configuration
// Generated on Sun Mar 31 2019 23:26:58 GMT+0900 (GMT+09:00)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // 브라우저에서 실행될 때, 전역에서 참조됨
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.ts',
      // Watch src files for changes but
			// don't load them into the browser.
      { pattern: 'src/**/*.ts', included: false }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.spec.ts": ["rollup"]
    },

    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-typescript2')({
            tsconfigDefaults: { compilerOptions: { types: ['mocha', 'chai', 'sinon']}}, //컴파일 할때 참조됨
            tsconfig: './config/typescript/tsconfig.dev.json'
        })],
      output: {
        format: 'iife',
        sourcemap: "inline",
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
