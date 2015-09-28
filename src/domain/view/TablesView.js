/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TableListItemView = require('domain/view/TableListItemView'),
        TablesViewTemplate = require('text!domain/template/TablesViewTemplate.html');

    return Backbone.View.extend({
        className: 'tables-view',
        initialize: function (config) {
            this.config = config || {};
            this._subviews = [];
            this.listenTo(this.collection, 'reset', this.render);

            this.render();
        },
        render: function () {
            this.$el.html(_.template(TablesViewTemplate)({database: this.config.database}));
            this.collection.each(this.addTable, this);
            this.calculateHeight();
            return this;
        },
        addTable: function (tableModel) {
            var view = new TableListItemView({model: tableModel});
            this._subviews.push(view);
            this.$el.find('ul').append(view.render().$el);
        },
        calculateHeight: function () {
            setTimeout(_.bind(function () {
                var topSectionHeight = $('.sidebar').height(),
                    titleHeight = this.$('.title').height();

                this.$('ul').height(topSectionHeight - titleHeight);
            }, this), 0);
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});