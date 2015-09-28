/**
 * Created by valeriy.abornyev on 9/24/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        ResourceModel = require('domain/model/ResourceModel');

    return Backbone.Collection.extend({
        model: ResourceModel
    });
});