/**
 * Created by itaysh on 7/27/15.
 */

'use strict';

module.exports = function (grunt) {

    var VENDOR_TARGET = 'build/vendor/';
    var VENDOR_STYLE_TARGET = 'build/css/vendor/';

    grunt.initConfig({
        clean: {
            main: {
                src: [VENDOR_TARGET + '**/*']
            },
            build: {
                src: 'build/**/*'
            },
            dist: {
                src: 'dist/**/*'
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: VENDOR_TARGET + 'require.js'
                    },
                    {
                        src: 'node_modules/lodash/index.js',
                        dest: VENDOR_TARGET + 'lodash.js'
                    },
                    {
                        src: 'node_modules/react/dist/react-with-addons.js',
                        dest: VENDOR_TARGET + 'react-with-addons.js'
                    },
                    {
                        src: 'node_modules/react-dragdrop/dist/DragDropMixin.js',
                        dest: VENDOR_TARGET + 'DragDropMixin.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/dist/react-datepicker.js',
                        dest: VENDOR_TARGET + 'DatePicker.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/dist/react-datepicker.css',
                        dest: VENDOR_STYLE_TARGET + 'date-picker.css'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/tether/dist/js/tether.js',
                        dest: VENDOR_TARGET + 'tether.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/tether/dist/css/tether.css',
                        dest: VENDOR_STYLE_TARGET + 'tether.css'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/moment/moment.js',
                        dest: VENDOR_TARGET + 'moment.js'
                    },
                    {
                        src: 'node_modules/react-datepicker/node_modules/react-onclickoutside/index.js',
                        dest: VENDOR_TARGET + 'react-onclickoutside.js'
                    },
                    {
                        src: 'node_modules/eventemitter2/lib/eventemitter2.js',
                        dest: VENDOR_TARGET + 'eventemitter2.js'
                    },
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: VENDOR_TARGET + 'require.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'build/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'build/js'
                    },
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html'
                    }
                    //{
                    //    src: 'node_modules/firebase/lib/firebase-web.js',
                    //    dest: VENDOR_TARGET + 'firebase.js'
                    //}
                ]
            },
            dist: {
                files: [
                    {
                        src: 'build/vendor/require.js',
                        dest: 'dist/vendor/require.js'
                    },
                    {
                        expand: true,
                        cwd: 'build/img/',
                        src: '**/*',
                        dest: 'dist/img'
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
                        dest: 'build/js/',
                        ext: '.js'
                    }
                ]
            }
        },
        asciify: {
            build: {
                text: 'Building...',
                options: {
                    font: 'doom',
                    log: true
                }
            },
            dist: {
                text: 'Publishing...',
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
                tasks: ['default'],
                options: {
                    debounceDelay: 500
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'build/js',
                    mainConfigFile: 'build/js/main.js',
                    out: 'dist/js/main.min.js',
                    name: 'main',
                    optimization: 'uglify',
                    preserveLicenseComments: false
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'dist/index.html': ['build/index.html']
                }
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    src: 'main.css',
                    dest: 'dist/css',
                    cwd: 'build/css',
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
                    dest: VENDOR_TARGET + 'stubContext.js',
                    objectToExport: 'stubContext',
                    amdModuleId: 'stubContext',
                    deps: {
                        'default': ['react', 'require', 'exports', 'module'],
                        amd: ['react', 'require', 'exports', 'module']
                    }
                }
            },
            Firebase: {
                options: {
                    src: 'node_modules/firebase/lib/firebase-web.js',
                    dest: VENDOR_TARGET + 'firebase.js',
                    objectToExport: 'Firebase',
                    amdModuleId: 'Firebase',
                    deps: {
                        'default': ['react', 'require', 'exports', 'module'],
                        amd: ['react', 'require', 'exports', 'module']
                    }
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/stylesheets',
                    src: '**/*.scss',
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },
        scsslint: {
            allFiles: [
                'src/stylesheets/**/*.scss'
            ],
            options: {
                colorizeOutput: true,
                config: '.scss-lint.yml',
                exclude: 'src/stylesheets/vendor/**/*.scss'
            }
        }
    });
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.registerTask('log', function (text) {
        grunt.log.writeln(text);
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('lint', ['eslint', 'scsslint']);
    grunt.registerTask('compile', ['sass', 'umd', 'babel']);
    grunt.registerTask('minify', ['processhtml', 'requirejs', 'cssmin']);
    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build-process', ['lint', 'clean:build', 'compile', 'copy:build']);
    grunt.registerTask('build', ['asciify:build', 'build-process']);

    grunt.registerTask('publish-process', ['clean:dist', 'minify', 'copy:dist']);
    grunt.registerTask('publish', ['asciify:dist', 'build-process', 'publish-process']);

    grunt.registerTask('default', ['build', 'test']);

};