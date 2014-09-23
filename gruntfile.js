module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build', ['sass', 'uglify']);
	grunt.registerTask('default', ['watch']);
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/formplate.css': 'sass/formplate.scss',
					'css/demo.css': 'sass/demo.scss'
				}
			}
		}, 
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/jquery-v1.10.2.min.js'			: ['js/jquery-v1.10.2.js'],
					'js/min/modernizr-custom-v2.7.1min.js'	: ['js/modernizr-custom-v2.7.1.js'],
					'js/min/formplate.min.js'				: ['js/formplate.js']
				}
			}
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			// Scripts
			scripts: {
				files: 'js/*.js',
				tasks: ['uglify']
			},
			// Live reload
			options: {
				livereload: true
		    } 
		} 
	});
}