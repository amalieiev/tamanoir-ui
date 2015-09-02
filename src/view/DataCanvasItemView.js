/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        jsPlumb = require('jsplumb'),
        _ = require('underscore'),
        DataCanvasSuggestedItemModel = require('model/DataCanvasSuggestedItemModel'),
        TableModel = require('model/TableModel'),
        DataCanvasSuggestedItemView = require('view/DataCanvasSuggestedItemView'),
        DataCanvasItemViewTemplate = require('text!template/DataCanvasItemViewTemplate.html');

    require('jquery-ui');

    return Backbone.View.extend({
        className: 'data-canvas-item-view',
        events: {
            'click .remove': 'onRemoveClick',
            'click input': 'onColumnClick',
            'click .settings': 'onSettingsClick',
            'click .plus': 'onPlusClick'
        },
        attributes: function () {
            return {
                id: this.model.get('name')
            };
        },
        initialize: function () {
            this._subview = [];
            this.listenTo(this.model, 'destroy', this.remove);

            this.render();
        },
        render: function () {
            this.$el.html(_.template(DataCanvasItemViewTemplate)(this.model.toJSON()));
            this.checkReference();
            return this;
        },
        checkReference: function() {
            if(this.model.getReferences().length == 0) {
                this.$('.plus').hide();
            }
        },
        onRemoveClick: function (event) {
            console.log('remove', this.model);
            this.model.collection.remove(this.model);//workaround
            this.model.trigger('destroy'); //workaround
        },
        onColumnClick: function (event) {
            var value = $(event.target).is(':checked'),
                table = this.model.get('name'),
                name = $(event.target).parent().text();
            console.log('columns click', value, this.model);

            if (value) {
                this.model.set('selected', this.model.get('selected').concat(table + '."' + name + '"'));
            } else {
                this.model.set('selected', _.without(this.model.get('selected'), table + '."' + name + '"'));
            }

            console.log('selected', this.model.get('selected'));
        },
        onSettingsClick: function () {
            this.$('.columnsList').toggleClass('hide');
            this.$el.toggleClass('z2');
        },
        onPlusClick: function() {
            this.$('.suggestedList').toggleClass('hide');
            this.$el.toggleClass('activeItem');

            this.$('.suggested ul').empty();

            _.each(this.model.getReferences(), function (value) {

                //get tables collection
                //get table name from value
                //get table model from tables collection by name
                //create DataCanvasSuggestedItemView with retrieved table model

                var view = new DataCanvasSuggestedItemView({ model: model });
                console.log(view);
                this._subview.push(view);
                this.$('.suggested ul').append(view.$el);
            }, this);
        }
    });
});