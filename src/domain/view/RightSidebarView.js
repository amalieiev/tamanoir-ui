/**
 * Created by valeriy.abornyev on 9/8/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        RightSidebarColumnsView = require('domain/view/RightSidebarColumnsView'),
        RightSidebarViewTemplate = require('text!domain/template/RightSidebarViewTemplate.html');

    return Backbone.View.extend({
        className: 'right-sidebar-view',

        events: {
            'click .remove-right-sidebar': 'closeRightSidebar'
        },

        template: _.template(RightSidebarViewTemplate),

        initialize: function() {
            this._subview = [];
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            var view = new RightSidebarColumnsView({model: this.model});

            this._subview.push(view);
            this.$('.columns-container').html(view.render().$el);

            this.calculateHeight();

            $('.right-sidebar-container').addClass('active');

            return this;
        },

        closeRightSidebar:function() {
            $('.right-sidebar-container').removeClass('active');
        },

        calculateHeight: function() {
            this.$el.height($('.data-canvas-view').height() - 1);
            this.$('.columns-container').height(this.$el.height() - $('.title').height());
        }
    })
});

