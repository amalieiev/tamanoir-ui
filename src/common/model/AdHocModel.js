/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('common/model/DomainModel');

    /**
     * @class common.model.AdHocModel
     */
    return Backbone.Model.extend({
        defaults: {
            /**
             * adhoc name
             */
            name: undefined,
            /**
             * adhoc domain
             */
            domain: undefined,
            /**
             * adhoc chart
             */
            chart: undefined
        },

        /**
         * initialize function
         */
        initialize: function () {
            this.domain = new DomainModel(this.get('domain'));
        }
    });
});