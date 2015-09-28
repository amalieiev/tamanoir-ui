/**
 * Created by valeriy.abornyev on 9/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            elements: undefined
        }
    });
});