/**
 * Created by Artem on 9/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DataCollection = require('domain/collection/DataCollection'),
        DomainModel = require('common/model/DomainModel'),
        TablesCollection = require('domain/collection/TablesCollection'),
        SidebarView = require('adhoc/view/SidebarView'),
        DialogView = require('common/view/DialogView'),
        TableView = require('domain/view/TableView'),
        ChartView = require('adhoc/view/ChartView'),
        AdHocDesignerViewTemplate = require('text!adhoc/template/AdHocDesignerViewTemplate.html');

    /**
     * @class adhoc.view.AdHocDesignerView
     * Top level view for adhoc designer
     */
    return Backbone.View.extend({

        /**
         * @property {String} className
         */
        className: 'adhoc-view',
        template: AdHocDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick',
            'click .eiditDomain': 'onEditDomainClick'
        },

        initialize: function () {
            this._subviews = [];

            //TODO: should be placed in model.
            this.series = [];

            this.domain = new DomainModel(this.model.get('domain'));

            this.tablesCollection = new TablesCollection();
            this.dataCollection = new DataCollection();

            this.listenTo(this.tablesCollection, 'change update reset', this.buildQuery);
            this.listenTo(Tamanoir, 'sidebar:column:dragstart', this.onDragstart);
            this.listenTo(Tamanoir, 'table:header:dragstart', this.onTableHeaderDragstart);
            this.listenTo(Tamanoir, 'dropzone:x:drop', this.onDropX);
            this.listenTo(Tamanoir, 'dropzone:y:drop', this.onDropY);

            this.tablesCollection.reset(this.model.get('domain').tables);

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            this.tableView = new TableView({collection: this.dataCollection});
            this.sidebarView = new SidebarView({model: this.model, collection: this.tablesCollection});
            this.chartView = new ChartView({model: this.model});

            this.$('.sidebar-container').html(this.sidebarView.$el);
            this.$('.chart-container').html(this.chartView.$el);
            this.$('.table-container').html(this.tableView.$el);

            this.calculateHeight();

            return this;
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.adhoc-header'),
                    contentHeight = bodyHeight - header.height();

                self.sidebarView.$el.height(contentHeight);
                self.chartView.$el.height(contentHeight / 2);
                //12px workaround should be removed
                self.tableView.$el.height(contentHeight / 2 - 12);
            }, 0);
        },

        buildQuery: function () {
            var self = this,
                query = this.tablesCollection.getQuery();

            console.log('query:', query);
            if(!query) return;

            //TODO: provide way to work with multiple connections
            //right now only one connection is supported
            //limit for 100 record
            this.domain.connections.first().query(query + ' LIMIT 100').then(function (data) {
                self.dataCollection.reset(data);
            });
        },

        onDropX: function () {
            console.log('dropzone:x:drop');
            this.chartView.renderChart();
        },

        onDropY: function () {
            console.log('dropzone:y:drop');

            this.chartView.chart.addSeries({
                name: this.draggedColumnName,
                data: this.dataCollection.getNumberDataByName(this.draggedColumnName)
            });
        },

        onDragstart: function (columnModel) {
            console.log('sidebar:column:dragstart', columnModel);
            this.draggedColumnName = columnModel.get('name');
        },

        onTableHeaderDragstart: function (headerName) {
            console.log('table:header:dragstart', headerName);
            this.draggedColumnName = headerName;
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        onEditDomainClick: function () {
            Tamanoir.navigate('/domain/' + this.model.get('domain').id, {trigger: true});
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});