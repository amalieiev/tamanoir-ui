/**
 * Created by valeriy.abornyev on 9/24/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            metadata: undefined
        }
    });
});