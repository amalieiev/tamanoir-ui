/**
 * Created by Artem.Malieiev on 7/1/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            axis: undefined
        }
    });
});