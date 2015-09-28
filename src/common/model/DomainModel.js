/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            connections: [],
            resources: []
        },

        parse: function(response){
            response.connections = new ConnectionsCollection(response.connections);
            return response;
        }
    });
});