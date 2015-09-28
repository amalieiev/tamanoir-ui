/**
 * Created by Artem.Malieiev on 7/20/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore');

    return Backbone.Collection.extend({
        getDataByName: function (name) {
            return this.map(function (value) {
                return value.get(name);
            });
        },
        getNumberDataByName: function (name) {
            return this.map(function (value) {
                return parseFloat(value.get(name));
            });
        }
    });
});