/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        SidebarViewTemplate = require('text!adhoc/template/SidebarViewTemplate.html'),
        ColumnModel = require('adhoc/model/ColumnModel'),
        ColumnView = require('adhoc/view/ColumnView');

    return Backbone.View.extend({

        template: SidebarViewTemplate,
        className: 'sidebar-view',

        events: {
        },

        initialize: function () {
            this._subviews = [];

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            _.each(this.collection.getCategories(), this.addCategory, this);
            _.each(this.collection.getNumbers(), this.addNumber, this);
            _.each(this.collection.getDates(), this.addDate, this);

            return this;
        },

        addCategory: function (name) {
            var columnView = new ColumnView({model: new ColumnModel({name: name})});

            this.$('ul.categories').append(columnView.$el);
            this._subviews.push(columnView);
        },

        addNumber: function (name) {
            var columnView = new ColumnView({model: new ColumnModel({name: name})});

            this.$('ul.numbers').append(columnView.$el);
            this._subviews.push(columnView);
        },

        addDate: function (name) {
            var columnView = new ColumnView({model: new ColumnModel({name: name})});

            this.$('ul.dates').append(columnView.$el);
            this._subviews.push(columnView);
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});