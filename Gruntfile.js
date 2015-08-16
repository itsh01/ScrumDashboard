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
                        src: 'node_modules/react-dragdrop/dist/DragDropMixin.js',
                        dest: 'src/vendor/DragDropMixin.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/dist/react-datepicker.js',
                        dest: 'src/vendor/DatePicker.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/dist/react-datepicker.css',
                        dest: 'src/stylesheets/vendor/date-picker.css'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/tether/dist/js/tether.js',
                        dest: 'src/vendor/tether.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/tether/dist/css/tether.css',
                        dest: 'src/stylesheets/vendor/tether.css'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/moment/moment.js',
                        dest: 'src/vendor/moment.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/react-onclickoutside/index.js',
                        dest: 'src/vendor/react-onclickoutside.js'
                    },
                    {
                        src: 'node_modules/eventemitter2/lib/eventemitter2.js',
                        dest: 'src/vendor/eventemitter2.js'
                    }
                ]
            },
            build: {
                files: [
                    {
                        src: 'src/vendor/require.js',
                        dest: 'build/vendor/require.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'build/img'
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
            src: [
                'src/js/**/*.jsx',
                'src/js/stores/**/*.js',
                '!src/js/stores/**/baseFlux.js',
                'src/js/mixins/*.js',
                '!src/js/data/*',
                '!src/js/playground.*',
                'Gruntfile.js',
                'src/js/main.jsx',
                'src/js/constants.js',
                'src/tests/**/*.js'
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
        },
        karma: {
            unit: {
                port: 9999,
                singleRun: true,
                configFile: 'karma.conf.js',
                client: {
                    captureConsole: false
                }
            }
        },
        umd: {
            all: {
                options: {
                    src: 'node_modules/react-stub-context/dist/index.js',
                    dest: 'src/vendor/stubContext.js',
                    objectToExport: 'stubContext',
                    amdModuleId: 'stubContext',
                    deps: {
                        'default': ['react', 'require', 'exports', 'module'],
                        amd: ['react', 'require', 'exports', 'module']
                    }
                }
            }
        }
    });

    grunt.registerTask('log', function (text) {
        grunt.log.writeln(text);
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('lint', ['eslint', 'csslint']);
    grunt.registerTask('dev', ['asciify:banner', 'lint', 'babel', 'test']);
    grunt.registerTask('minify', ['processhtml', 'requirejs', 'cssmin']);
    grunt.registerTask('build', ['asciify:banner', 'lint', 'clean', 'babel', 'umd', 'copy', 'minify']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('default', ['build', 'test']);

};