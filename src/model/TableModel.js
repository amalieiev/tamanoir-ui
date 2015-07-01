/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        QueryExecuter = require('util/QueryExecuter'),
        DomainModel = require('model/DomainModel'),
        MetadataExplorer = require('util/MetadataExplorer');

    /**
     * @example
     * new TableModel({domain: domain});
     */
    return Backbone.Model.extend({
        defaults: {
            data: [],
            metadata: {},
            columns: []
        },

        initialize: function (config) {
            this.metadataExplorer = new MetadataExplorer(config.domain);
            this.queryExecuter = new QueryExecuter(config.domain);
        },

        load: function (table) {
            this.metadataExplorer.getMetadata(table).then(_.bind(this.onMetadataLoaded, this));
        },

        onMetadataLoaded: function (metadata) {
            this.prepareMetadata(metadata);

            var columnNames = this.getColumnNames(metadata),
                query = 'SELECT {columnNames} FROM {tableName} LIMIT 20'
                    .replace(/{columnNames}/gi, columnNames)
                    .replace(/{tableName}/gi, metadata.name);

            this.queryExecuter.query(query).then(_.bind(this.onDataLoaded, this));
        },

        prepareMetadata: function (metadata) {
            console.log('metadata loaded', metadata);
            this.set('metadata', _.extend(this.get('metadata'), _.reduce(metadata.items, function (memo, value) {
                memo[value.name] = _.extend(value, {belongTo: metadata.name});
                return memo;
            }, {})));
        },

        getColumnNames: function (metadata) {
            return _.map(metadata.items, function (value) {
                return metadata.name + '.' + value.name;
            });
        },

        hideColumn: function (name) {
            console.log('hide', name);
            this.set('columns', _.without(this.get('columns'), name));
        },

        onDataLoaded: function (data) {
            console.log('data loaded', data);
            this.set('data', data);
            this.set('columns', _.keys(data[0]));
            this.trigger('loaded', this);
        },

        join: function (originTable, foreignTable, originKey, foreignKey) {

            var query = 'SELECT * FROM {originTable} INNER JOIN {foreignTable} ON {originKey}={foreignKey} LIMIT 20'
                .replace(/{originTable}/gi, originTable)
                .replace(/{originKey}/gi, originKey)
                .replace(/{foreignTable}/gi, foreignTable)
                .replace(/{foreignKey}/gi, foreignKey);

            this.metadataExplorer.getMetadata(foreignTable).then(_.bind(function (metadata) {
                this.prepareMetadata(metadata);
                this.queryExecuter.query(query).then(_.bind(this.onDataLoaded, this));
            }, this));
        }
    });
});