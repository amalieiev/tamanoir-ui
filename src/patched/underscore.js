/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var _ = require('lodash'),
        str = require('underscore.string');

    _.str = str;

    _.templateSettings = {
        escape: /\{\{-([\s\S]+?)\}\}/g,
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g
    };

    return _;
});