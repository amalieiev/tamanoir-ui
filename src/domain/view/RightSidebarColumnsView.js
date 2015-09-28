/**
 * Created by valeriy.abornyev on 9/10/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnsCollection = require('domain/collection/ColumnsCollection'),
        RightSidebarColumnsItemView = require('domain/view/RightSidebarColumnsItemView');

    return Backbone.View.extend({
        tagName: "ul",


        initialize: function(){
            this._subviews = [];
            this.collection = new ColumnsCollection(this.model.get('items'));
            this.collection.each(function(model) {
                    model.set('checked', _.contains(this.model.get('selected'), model.get('name')));
            }, this);
            this.listenTo(this.collection, 'change', this.onCheckboxChange);
            this.render();
        },

        render: function() {
            _.invoke(this._subviews, 'remove');
            this.collection.each(this.addColumn, this);
            return this;
        },

        addColumn: function(model) {
            var view = new RightSidebarColumnsItemView({model: model});
            this._subviews.push(view);
            this.$el.append(view.$el);
        },

        onCheckboxChange: function(model) {
            var selected = this.model.get('selected');
            if(model.get('checked')) {
                selected = selected.concat(model.get('name'));
            } else {
                selected = _.without(selected, model.get('name'));
            }
            this.model.set('selected', selected);
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});