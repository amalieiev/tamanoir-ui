/**
 * Created by Artem.Malieiev on 7/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DomainListItemViewTemplate = require('text!home/template/DomainListItemViewTemplate.html');

    return Backbone.View.extend({
        className: 'domains-list-item-view',
        tagName: 'li',
        events: {
            'click .domain': 'onDomainClick',
            'click .edit': 'onEditDomainClick',
            'click .delete': 'onDeleteDomainClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(_.template(DomainListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onDomainClick: function () {
            Tamanoir.navigate('domain/' + this.model.get('id'), {trigger: true});
        },
        onDeleteDomainClick: function () {
            this.model.destroy();
        },
        onEditDomainClick: function () {
            Tamanoir.trigger('domainsList:domain:edit', this.model);
        }
    });
});