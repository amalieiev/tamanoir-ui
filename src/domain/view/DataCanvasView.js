/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        vis = require('vis'),
        JoinTypeWidgetView = require('domain/view/JoinTypeWidgetView');

    return Backbone.View.extend({

        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },

        initialize: function (options) {
            this._subviews = [];

            this.listenTo(Tamanoir, 'dragstart:sidebarTable', this.onSidebarTableDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);

            this.render();
        },

        render: function () {
            this.$el.empty();

            var settings = this.collection.generateVisModel(),
                options = {};

            this.network = new vis.Network(this.el, settings, options);

            return this;
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            console.log('drop:sidebarTable');
            if (this.draggedTableModel) {
                this.collection.add(this.draggedTableModel);
            } else {
                this.collection.add(this.draggedTablesCollection.models);
            }
        },

        onSidebarTableDragstart: function (tableModel) {
            this.draggedTableModel = tableModel;
            this.draggedCollection = null;
        },

        onSidebarConnectionDragstart: function (tablesCollection) {
            console.log('dragstart:sidebarConnection');
            this.draggedTablesCollection = tablesCollection;
            this.draggedTableModel = null;
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});
