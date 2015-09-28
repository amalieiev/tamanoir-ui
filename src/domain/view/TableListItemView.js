/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableListItemViewTemplate = require('text!domain/template/TableListItemViewTemplate.html');

    return Backbone.View.extend({

        tagName: 'li',
        attributes: {
            draggable: true
        },
        className: 'table-list-item-view',
        template: _.template(TableListItemViewTemplate),
        events: {
            'dragstart': 'onDragStart'
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change:dragged', this.onDraggedChange)
        },

        render: function () {
            if(!this.model.get('dragged')) {
                this.$el.html(this.template(this.model.toJSON()));
            }
            return this;
        },

        onDragStart: function () {
            console.log('dragstart:sidebarTable');
            Tamanoir.trigger('dragstart:sidebarTable', this.model);
        },
        onDraggedChange: function(model) {
            console.log(model);
            this.$el.hide();
        }
    });
});