/**
 * Created by Artem.Malieiev on 7/9/2015.
 */


define(function (require) {
    var ConnectionModel = require('common/model/ConnectionModel'),
        _ = require('underscore'),
        $ = require('jquery'),
        tamanoirConfig = require('tamanoir.config');

    /**
     * @class common.model.PostgreSQLConnectionModel
     * @extends common.model.ConnectionModel
     * Postgres connection model
     */
    return ConnectionModel.extend({

        defaults: _.extend({}, ConnectionModel.prototype.defaults, {
            /**
             * database url
             */
            url: undefined,
            /**
             * database name
             */
            database: undefined,
            /**
             * server url
             */
            server: undefined,
            /**
             * database port
             */
            port: undefined,
            /**
             * database user name
             */
            user: undefined,
            /**
             * database user password
             */
            password: undefined
        }),

        /**
         * Fetches metadata for postgres connection
         * @returns {Object} metadata
         */
        fetchMetadata: function () {
            var deferred = $.Deferred(),
                self = this;

            $.ajax({
                url: tamanoirConfig.serverUrl + '/rest/connections?recursive=root',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/metadata+json'
                },
                data: JSON.stringify({
                    url: this.get('url'),
                    type: 'jdbc',
                    properties: {
                        user: this.get('user'),
                        password: this.get('password')
                    }
                })
            }).then(function (data) {
                self.set('metadata', data);
                deferred.resolve(data);
            }).fail(this.showError);

            return deferred;
        },

        /**
         * Executes sql query for postgres connection
         * @param {String} query
         * @returns {Array}
         */
        query: function (query) {
            return Backbone.ajax({
                url: tamanoirConfig.serverUrl + '/rest/connections',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/queryconnection+json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({
                    url: this.get('url'),
                    type: 'jdbc',
                    properties: {
                        user: this.get('user'),
                        password: this.get('password')
                    },
                    nativeQuery: query
                })
            }).fail(this.showError);
        }
    });
});