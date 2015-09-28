/**
 * Created by Artem.Malieiev on 6/17/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        DialogViewTemplate = require('text!common/template/DialogViewTemplate.html');

    /**
     * @class common.view.DialogView
     */
    var DialogView = Backbone.View.extend({
        events: {
            'click button[data-action]': 'onActionButtonClick',
            'click .mask': 'onMaskClick'
        },
        initialize: function (config) {
            config = config || {};
            this.icon = config.icon || '';
            this.title = config.title || '';
            this.type = config.type || '';
            this.content = config.content || '';
            this.buttons = config.buttons || [];
        },
        render: function () {
            this.$el.html(_.template(DialogViewTemplate)(this));
            this.$el.appendTo('body');
            this.setContent(this.content);
            return this;
        },
        onActionButtonClick: function (event) {
            this.trigger('action:' + $(event.target).data('action'));
            this.remove();
        },
        onMaskClick: function () {
            this.remove();
        },
        setContent: function (content) {
            this.$el.find('.dialog-body').html(content);
            this.center();
        },
        center: function () {
            var bodyHeight = $('body').height(),
                bodyWidth = $('body').width(),
                $dialog = this.$el.find('.dialog-container');

            $dialog.css({
                top: (bodyHeight - $dialog.height()) / 2,
                left: (bodyWidth - $dialog.width()) / 2
            });
        }
    }, {
        showMessage: function (options) {
            options = typeof options === 'object' ? options : {
                icon: 'idea',
                content: options,
                buttons: [{label: 'Ok'}]
            };

            return new DialogView(options).render();
        },

        showError: function (options) {
            options = typeof options === 'object' ? options : {
                icon: 'error',
                type: 'error',
                title: 'Error',
                content: options
            };

            return new DialogView(options).render();
        }
    });

    return DialogView;
});