/**
 * Created by valeriy.abornyev on 9/23/2015.
 */


define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery');

    var ElementView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-item',

        template: _.template('<div>{{- name }}</div>'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template( this.model.attributes ) );
            return this;
        }

    });

    return ElementView;
});