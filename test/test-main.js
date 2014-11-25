/* global requirejs */

(function() {
    'use strict';

    var baseUrl = '',
        specFiles = null,
        requirejsCallback = null;

    // if invoked in karma-runner environment
    if (typeof window !== 'undefined' && window.__karma__ !== undefined) {
        // Karma serves files from '/base'
        baseUrl = '/base';
        requirejsCallback = window.__karma__.start;

        // looking for *_spec.js files
        specFiles = [];
        for (var file in window.__karma__.files) {
            if (window.__karma__.files.hasOwnProperty(file)) {
                if (/.*\/test\/spec\/.+\.spec\.js$/.test(file)) {
                    specFiles.push(file);
                }
            }
        }
    }

    requirejs.config({
        baseUrl: baseUrl,

        paths: {
            'require': 'scripts/lib/requirejs/require',
            'jquery': 'scripts/lib/jquery/dist/jquery',
            'lodash': 'scripts/lib/lodash/dist/lodash',
            'react': 'scripts/lib/react/react-with-addons',
            'utils': 'scripts/utils',
            'alarmItem': 'scripts/alarmItem',
            'alarmList': 'scripts/alarmList',
            'controlBar': 'scripts/controlBar',
            'alarmModule': 'scripts/alarmModule',
            'alarmBox': 'scripts/alarmBox'
        },

        // ask Require.js to load these files (all our tests)
        deps: specFiles,

        // start test run, once Require.js is done
        callback: requirejsCallback
    });
})();
