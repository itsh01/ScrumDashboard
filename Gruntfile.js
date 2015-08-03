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
                    },
                    {
                        src: 'node_modules/react-router/umd/ReactRouter.js',
                        dest: 'src/vendor/ReactRouter.js'
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
            src: [
                'src/js/**/*.jsx',
                'src/js/stores/*.js',
                'src/js/mixins/*.js',
                '!src/js/data/*',
                '!src/js/playground.*',
                'Gruntfile.js',
                'src/js/main.jsx'
            ]
        },
        babel: {
            options: {
                sourceMap: false,
                blacklist: ['strict']
            },
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
            },
            danger: {
                text: 'Danger  Build !!!',
                options: {
                    font: 'doom',
                    log: true
                }
            }
        },
        watch: {
            dev: {
                files: [
                    'src/**/*.css',
                    'src/**/*.jsx',
                    'src/js/**/*.js',
                    '!src/js/components/**/*.js',
                    '!src/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['dev'],
                options: {
                    debounceDelay: 500
                }
            },
            react: {
                files: [
                    'src/**/*.jsx'
                ],
                tasks: [
                    'asciify:danger',
                    'log:"\nDO NOT COMMIT BEFORE BUILDING!!\n"',
                    'babel'
                ],
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

    grunt.registerTask('log', function (text) {
        grunt.log.writeln(text);
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('lint', ['eslint', 'csslint']);
    grunt.registerTask('dev', ['asciify:banner', 'lint', 'babel']);
    grunt.registerTask('minify', ['processhtml', 'requirejs', 'cssmin']);
    grunt.registerTask('build', ['asciify:banner', 'lint', 'clean', 'babel', 'copy', 'minify']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['test', 'build']);

};