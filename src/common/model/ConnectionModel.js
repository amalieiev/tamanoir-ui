define(function (require) {
    var Backbone = require('backbone'),
        DialogView = require('common/view/DialogView'),
        ConnectionType = require('common/enum/ConnectionType'),
        _ = require('underscore');

    /**
     * @class common.model.ConnectionModel
     * Base model for all connections
     */
    return Backbone.Model.extend({

        defaults: {
            /**
             * connection name
             */
            name: undefined,
            /**
             * connection metadata
             */
            metadata: undefined,
            /**
             * connection type
             */
            type: ConnectionType.POSTGRES
        },

        /**
         * @abstract
         * Fetches metadata for connection
         */
        fetchMetadata: function () {
            throw 'fetchMetadata method should be overwritten';
        },

        /**
         * @abstract
         * Executes sql query for current connection
         */
        query: function (query) {
            throw 'query method should be overwritten';
        },

        /**
         * @method
         * @param {Object} error - xhr error object
         * Shows error
         */
        showError: _.debounce(function (error) {
            DialogView.showError(error.responseJSON.message);
        }, 1000, true)
    });
});