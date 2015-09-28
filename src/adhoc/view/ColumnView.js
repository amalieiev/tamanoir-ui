/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnViewTemplate = require('text!adhoc/template/ColumnViewTemplate.html');

    return Backbone.View.extend({

        tagName: 'li',
        attributes: {
            draggable: true
        },
        template: _.template(ColumnViewTemplate),
        className: 'column-view',

        events: {
            'dragstart': 'onDragstart'
        },

        initialize: function () {
            this.render();
        },

        onDragstart: function () {
            Tamanoir.trigger('sidebar:column:dragstart', this.model);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});