/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        AdHocModel = require('common/model/AdHocModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: AdHocModel,
        localStorage: new Backbone.LocalStorage('adhocs')
    });
});