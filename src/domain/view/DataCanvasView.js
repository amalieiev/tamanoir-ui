/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        vis = require('vis'),
        RightSidebarView = require('domain/view/RightSidebarView'),
        TableModel = require('domain/model/TableModel'),
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

            setTimeout(function () {this.render();}.bind(this), 100);//TODO: find solution how to remove this hook
        },

        render: function () {
            this.$el.empty();

            var settings = this.collection.generateVisModel(),
                options = {};

            this.network = new vis.Network(this.el, settings, options);
            this.network.on('click', this.clickNode.bind(this));
            return this;
        },

        clickNode: function(param) {

            var model = this.collection.get(param.nodes[0]);

            if(model) {
                var view = new RightSidebarView({model: model});
                $('.right-sidebar-container').html(view.render().$el);
            }
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            console.log('drop:sidebarTable');
            if (this.draggedTableModel) {
                this.draggedTableModel.set('dragged', true);
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

