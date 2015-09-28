define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        Highcharts = require('highcharts'),
        ChartViewTemplate = require('text!adhoc/template/ChartViewTemplate.html'),
        ChartDropZoneView = require('adhoc/view/ChartDropZoneView');

    return Backbone.View.extend({
        className: 'chart-view',
        template: ChartViewTemplate,
        events: {
            'dragover': 'onDragover'
        },

        initialize: function () {
            this.chartDropZoneView = new ChartDropZoneView();

            this.showDropZone = _.debounce(this.showDropZone, 1000, true);

            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.$('.dropzone-container').html(this.chartDropZoneView.$el);

            this.hideDropZone();
            this.calculateHeight();
        },

        initChart: function () {
            this.chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart-container'
                },
                title: {
                    text: this.model.get('name') || this.model.get('domain').name
                }
            });
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                self.$('#chart-container').height(self.$el.height());
                self.initChart();
            }, 100);
        },

        showDropZone: function () {
            this.chartDropZoneView.$el.show();
            this.chartDropZoneView.$el.css({
                top: (this.$el.height() / 2) - (this.chartDropZoneView.$el.height() / 2),
                left: (this.$el.width() / 2) - (this.chartDropZoneView.$el.width() / 2)
            });
        },

        hideDropZone: function () {
            this.chartDropZoneView.$el.hide();
        },
        onDragover: function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(_.bind(this.hideDropZone, this), 200);
            this.showDropZone();
        }
    });
});