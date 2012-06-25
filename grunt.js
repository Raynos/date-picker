module.exports = grunt;

function grunt(grunt) {
	grunt.loadNpmTasks('grunt-css');

	grunt.initConfig({
		cssmin: {
			css: {
				src: 'src/dp.css',
				dest: 'src/dp.min.css'
			}
		},
		min: {
			js: {
				src: 'src/dp.js',
				dest: 'src/dp.min.js'
			}
		}
	});

	grunt.registerTask('default', 'min cssmin');
};
