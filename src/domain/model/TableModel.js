/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        idAttribute: 'name',
        defaults: {
            connectionId: undefined,
            name: undefined,
            label: undefined,
            items: undefined,
            selected: [],
            dragged: false
        },

        idAttribute: 'name',

        getRelatedTableNames: function () {
            return _.reduce(this.get('items'), function (memo, column) {
                if (column.referenceTo) {
                    memo.push(this._getRelatedTableName(column));
                }
                return memo;
            }, [], this);
        },

        getRelationForTable: function (relatedTableName) {
            var item = _.find(this.get('items'), function (column) {
                if (column.referenceTo) {
                    var relTableName = this._getRelatedTableName(column);
                    return relatedTableName == relTableName;
                }
            }, this);

            var relation = {};

            relation.sourceTableName = this.get('name');
            relation.sourceColumnName = item.name;
            relation.targetTableName = this._getRelatedTableName(item);
            relation.targetColumnName = this._getRelatedColumnName(item);

            return relation;
        },

        _getRelatedTableName: function (item) {
            return item.referenceTo.substring(item.referenceTo.indexOf('.') + 1, item.referenceTo.lastIndexOf('.'));
        },

        _getRelatedColumnName: function (item) {
            return item.referenceTo.slice(item.referenceTo.lastIndexOf('.') + 1);
        }
    });
});