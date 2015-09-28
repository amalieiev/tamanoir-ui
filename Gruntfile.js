/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.config.js',
                autoWatch: false,
                singleRun: true
            }
        },

        requirejs: {
            compileJS: {
                options: {
                    baseUrl: 'src',
                    include: ['main'],
                    includeRequire: ['main'],
                    mainConfigFile: 'src/require.config.js',
                    wrap: true,
                    name: 'bower_components/almond/almond',
                    out: 'build/main.js',
                    optimize: 'none'
                }
            },
            compileCSS: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: 'css/main.css',
                    out: 'build/main.css'
                }
            }
        }
    });

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['requirejs']);
    grunt.registerTask('default', ['test', 'build']);
};