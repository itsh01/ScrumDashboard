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
            },
            build: {
                src: 'src/vendor/require.js',
                dest: 'build/vendor/require.js'
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
            src: ['src/js/**/*.jsx', '!src/js/data/*', 'Gruntfile.js', 'src/js/main.js']
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
                files: ['src/**/*.jsx', 'src/js/**/*.js', '!src/js/components/*.js', '!src/js/components/**/*.js', 'src/**/*.css', 'Gruntfile.js'],
                tasks: ['dev'],
                options: {
                    debounceDelay: 500
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js',
                    mainConfigFile: 'src/js/main.js',
                    out: 'build/js/main.min.js',
                    name: 'main',
                    optimization: 'uglify',
                    preserveLicenseComments: false
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'build/index.html': ['src/index.html']
                }
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    src: 'main.css',
                    dest: 'build/css',
                    cwd: 'src/stylesheets',
                    ext: '.min.css'
                }]
            }
        }
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('lint', ['eslint', 'csslint']);
    grunt.registerTask('dev', ['asciify:banner', 'lint', 'react:main']);
    grunt.registerTask('minify', ['processhtml', 'requirejs', 'cssmin']);
    grunt.registerTask('build', ['asciify:banner', 'lint', 'clean', 'react:main', 'copy', 'minify']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['test', 'build']);

};