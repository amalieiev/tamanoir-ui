/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
require(['common/router/MainRouter', 'jquery'], function (MainRouter) {

    window.Tamanoir = new MainRouter();
    Backbone.history.start();

    //remove loading screen
    $('body').removeClass('splash-screen');
});