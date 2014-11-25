module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '.',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            // allow to load any *.js from node_modules by karma web-server
            { pattern: 'scripts/lib/requirejs/require.js', included: false },
            { pattern: 'scripts/lib/jquery/dist/jquery.js', included: false },
            { pattern: 'scripts/lib/lodash/dist/lodash.js', included: false },
            { pattern: 'scripts/lib/react/react-with-addons.js', included: false },

            { pattern: 'scripts/*.js',  included: false },
            { pattern: 'test/spec/**/*.js', included: false },
            { pattern: 'test/test-main.js', included: true }
        ],

        // list of files to exclude
        exclude: [
            'scripts/config.js'
        ],

        preprocessors: {
            'scripts/*.js': ['coverage']
        },

        // 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['spec', 'coverage'],

        // [ LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG ]
        logLevel: config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],
        port: 9876,
        colors: true,
        autoWatch: true,
        captureTimeout: 60000,
        singleRun: false
    });
};
