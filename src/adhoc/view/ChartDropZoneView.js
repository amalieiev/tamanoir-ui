define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        ChartDropZoneViewTemplate = require('text!adhoc/template/ChartDropZoneViewTemplate.html');

    return Backbone.View.extend({
        className: 'chart-drop-zone-view',
        template: ChartDropZoneViewTemplate,
        events: {
            'dragover .x-zone': 'onDragover',
            'dragover .y-zone': 'onDragover',
            'drop .x-zone': 'onDropX',
            'drop .y-zone': 'onDropY'
        },

        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);

            return this;
        },

        onDragover: function (event) {
            event.preventDefault();
        },
        onDropX: function () {
            Tamanoir.trigger('dropzone:x:drop');
        },
        onDropY: function () {
            Tamanoir.trigger('dropzone:y:drop');
        }
    });
});