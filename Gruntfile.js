/**
 * Created by itaysh on 7/27/15.
 */

module.exports = function(grunt) {

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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['test', 'build']);

};