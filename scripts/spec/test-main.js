var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'scripts',

    paths: {
        lodash: 'lib/lodash/dist/lodash.min',
        react: 'lib/react/react',
        jquery: 'lib/jquery/dist/jquery'
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
