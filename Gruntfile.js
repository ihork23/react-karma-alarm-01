module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				mangle: true,
				compress: true,
				sourceMap: "dist/app.map",
				banner: "/* ihork@wix.com */\n"
			},
			target: {
				src: "dist/app.js",
				dest: "dist/app.min.js"
			}
		},
		sass: {
			dist: {
				files: {
					'styles/style.css': 'sass/style.scss'
				}
			}
		},
		concat: {
			main: {
				src: ['scripts/*.js'],
				dest: 'dist/app.js'
			}
		},
		jasmine: {
			all: {
				src: [
					'scripts/app.js'
				],
				options: {
					specs: 'scripts/spec/*spec.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: 'scripts/config.js'
					}
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			scripts: {
				files: ['scripts/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jasmine:all']);
	grunt.registerTask('default', ['watch']);
}