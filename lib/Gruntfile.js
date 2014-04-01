module.exports = function(grunt) {
    grunt.initConfig({
        dirs: {
            css: '../css/',
            sass: '../sass/'
        },

        compass: {
            compile: {
                options: {
                    sassDir: '<%= dirs.sass %>',
                    cssDir: '<%= dirs.css %>'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= dirs.sass %>*.sass'
                ],
                tasks: ['compass:compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['compass:compile']);
};
