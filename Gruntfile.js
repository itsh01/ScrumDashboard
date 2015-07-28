/**
 * Created by itaysh on 7/27/15.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            main: {
              src: ['src/vendor/**/*']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: 'src/vendor/require.js'
                    },
                    {
                        src: 'node_modules/lodash/index.js',
                        dest: 'src/vendor/lodash.js'
                    },
                    {
                        src: 'node_modules/react/dist/react-with-addons.js',
                        dest: 'src/vendor/react-with-addons.js'
                    }
                ]
            }
        },
        react: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['**/*.jsx'],
                        dest: 'src/js/',
                        ext: '.js'
                    }
                ]
            }
        },
        eslint: {
            src: ['src/js/*.jsx', 'Gruntfile.js']
        },
        csslint: {
            options: {
                'adjoining-classes': false,
                'import': false,
                'fallback-colors': false,
                'unqualified-attributes': false
            },
            src: ['src/stylesheets/*.css']
        },
        asciify: {
            banner: {
                text: 'Building...',
                options: {
                    font: 'doom',
                    log: true
                }
            }
        },
        watch: {
            dev: {
                files: ['src/**/*.jsx', 'src/**/*.css', 'Gruntfile.js'],
                tasks: ['dev'],
                options: {
                    debounceDelay: 500
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-asciify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-eslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');


    grunt.registerTask('lint', ['eslint', 'csslint']);
    grunt.registerTask('dev', ['asciify:banner', 'lint', 'react:main']);
    grunt.registerTask('build', ['asciify:banner', 'lint', 'clean', 'react:main', 'copy']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['test', 'build']);

};