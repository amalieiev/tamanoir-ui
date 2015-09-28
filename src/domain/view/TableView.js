/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableViewTemplate = require('text!domain/template/TableViewTemplate.html');

    return Backbone.View.extend({
        className: 'table-view',
        template: _.template(TableViewTemplate),
        events: {
            'click th div': 'onTableHeaderClick',
            'dragstart th div': 'onTableHeaderDragstart',
            'scroll': 'onScroll'
        },
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);

            this.render();
        },
        render: function () {
            this.$el.html(this.template({
                data: this.collection.toJSON()
            }));

            this.onScroll();

            return this;
        },
        onTableHeaderClick: function (event) {
            var value = $(event.target).text().trim();

            if (this.reverse) {
                this.collection.reset(this.collection.sortBy(value).reverse());
                this.reverse = false;
            } else {
                this.collection.reset(this.collection.sortBy(value));
                this.reverse = true;
            }
        },
        onTableHeaderDragstart: function (event) {
            var name = $(event.target).text().trim();

            Tamanoir.trigger('table:header:dragstart', name);
        },
        onScroll: function (event) {
            this.$('.inner').css({
                top: this.$el.scrollTop()
            });

            this.$('.header').css({
                top: this.$el.scrollTop(),
                left: this.$el.scrollLeft()
            });
        }
    });
});