'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowercopy: {

        libs: {
            options: {
                destPrefix: 'public/'
            },
            files: {
            'js/nprogress.js': 'nprogress/nprogress.js',
            'css/nprogress.css': 'nprogress/nprogress.css',
            'js/jquery.cookie.js': 'jquery.cookie/jquery.cookie.js',
            'js/jquery.min.js': 'jquery/dist/jquery.min.js',
            'js/jquery.min.map': 'jquery/dist/jquery.min.map',
            'js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
            'css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
            'css/jcsdl.min.css': 'jcsdl/minified/jcsdl.min.css',
            'js/jcsdl.min.js': 'jcsdl/minified/jcsdl.min.js',
            'js/jcsdl.definition.js': 'jcsdl/minified/jcsdl.definition.js',
            'css/img': 'jcsdl/minified/img',
            'css/swf': 'jcsdl/minified/swf'
            }
        }
        },
        // JShint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
        },
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
    grunt.registerTask('default', ['bowercopy', 'jshint', 'mochaTest']);

};