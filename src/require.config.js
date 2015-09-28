/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
require.config({
    baseUrl: 'src',
    paths: {
        backbone: 'bower_components/backbone/backbone',
        'backbone.localStorage': 'bower_components/backbone.localStorage/backbone.localStorage',
        jquery: 'bower_components/jquery/dist/jquery',
        vis: 'patched/vis',
        lodash: 'bower_components/lodash/lodash',
        underscore: 'patched/underscore',
        highcharts: 'bower_components/highcharts/highcharts',
        'underscore.string': 'bower_components/underscore.string/dist/underscore.string',
        text: 'bower_components/requirejs-text/text',
        css: 'bower_components/require-css/css'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        highcharts: {
            exports: 'Highcharts'
        }
    }
});