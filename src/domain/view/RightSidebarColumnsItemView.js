/**
 * Created by valeriy.abornyev on 9/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        RightSidebarColumnsItemViewTemplate = require('text!domain/template/RightSidebarColumnsItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: "li",
        template: _.template(RightSidebarColumnsItemViewTemplate),

        events: {
            'change input[type="checkbox"]': 'onCheckboxChange'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onCheckboxChange: function(event) {
            if(this.$('input[type="checkbox"]').prop('checked')) {
                this.model.set('checked', true);
            } else {
                this.model.set('checked', false);
            }
        }

    })
});