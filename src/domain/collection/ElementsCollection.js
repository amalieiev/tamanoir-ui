/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        GroupModel = require('domain/model/GroupModel'),
        ElementModel = require('domain/model/ElementModel');

    require('backbone.localStorage');

    var ElementsCollection = Backbone.Collection.extend({
        model: function(attrs, options) {
            if (attrs.group) {
                return new GroupModel({
                    name: attrs.group.name,
                    elements: new ElementsCollection(attrs.group.elements)
                });
            } else if(attrs.element){
                return new ElementModel(attrs.element, options);
            } else {
                throw 'error';
            }
        }
    });

    return ElementsCollection;
});