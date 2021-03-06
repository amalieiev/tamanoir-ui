/**
 * Created by artem on 7/29/15.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TableModel = require('model/TableModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: TableModel,
        localStorage: new Backbone.LocalStorage('tables')
    });
});