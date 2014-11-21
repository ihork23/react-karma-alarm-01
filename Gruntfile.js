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
				src: "src/app.js",
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
		jasmine: {
			all: {
				src: [
					'scripts/app.js'
				],
				options: {
					//amd: true,
					//vendor: 'scripts/lib/**/*.js',
					specs: 'scripts/spec/*spec.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						// requireConfig: {
						// 	baseUrl: './scripts'
						// }//,
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
				tasks: ['jasmine:all']
			},
			test: {
				files: ['scripts/*.js'],
				tasks: ['jasmine:all']
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jasmine:all']);
	grunt.registerTask('default', ['watch']);
}