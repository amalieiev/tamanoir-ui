/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DialogView = require('common/view/DialogView'),
        TablesCollection = require('domain/collection/TablesCollection'),
        TableListItemView = require('domain/view/TableListItemView'),
        ConnectionViewTemplate = require('text!domain/template/ConnectionViewTemplate.html');

    return Backbone.View.extend({

        className: 'connection-view',
        template: _.template(ConnectionViewTemplate),
        events: {
            'dragstart .title': 'onConnectionDrag'
        },

        initialize: function () {
            this._subviews = [];

            this.tablesCollection = new TablesCollection();

            this.listenTo(this.model, 'change:metadata', this.onConnectionMetadataLoaded);
            this.listenTo(this.tablesCollection, 'reset', this.render);

            if (this.model.get('metadata')) {
                this.onConnectionMetadataLoaded();
            } else {
                this.model.fetchMetadata();
            }
        },

        render: function () {
            _.invoke(this._subviews, 'remove');
            this.$el.html(this.template(this.model.toJSON()));

            this.tablesCollection.each(this.addTable, this);

            return this;
        },

        addTable: function (tableModel) {
            var tableView = new TableListItemView({model: tableModel});

            this._subviews.push(tableView);
            this.$('ul').append(tableView.$el);
        },

        onConnectionDrag: function () {
            console.log('dragstart:sidebarConnection');
            Tamanoir.trigger('dragstart:sidebarConnection', this.tablesCollection);
        },

        onConnectionMetadataLoaded: function () {
            this.tablesCollection.reset(this.model.get('metadata'));
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});