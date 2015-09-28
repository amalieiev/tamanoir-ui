/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainModel = require('common/model/DomainModel'),
        AdHocModel = require('common/model/AdHocModel'),
        DialogView = require('common/view/DialogView'),
        HomeView = require('home/view/HomeView'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection'),
        AdHocCollection = require('common/collection/AdHocCollection'),
        DomainsCollection = require('common/collection/DomainsCollection'),
        AdHocDesignerView = require('adhoc/view/AdHocDesignerView'),
        DomainDesignerView = require('domain/view/DomainDesignerView');

    /**
     * @class common.router.MainRouter
     * Application main router
     */
    return Backbone.Router.extend({

        routes: {
            '(/)': 'navigateToHome',
            'domain/:entityId': 'navigateToDomainDesigner',
            'adhoc/:entityId': 'navigateToAdHocDesigner',
            '*otherwise': 'navigateToHome'
        },

        navigateToHome: function () {
            //set url to '/' for otherwise routes
            this.navigate('/');

            this.loadView(new HomeView());
        },

        navigateToDomainDesigner: function (entityId) {
            var connectionsCollection = new ConnectionsCollection(),
                domainsCollection = new DomainsCollection(),
                self = this;

            //try to find domain by entityId
            domainsCollection.fetch().then(function () {
                var domain = domainsCollection.get(entityId);

                if (domain) {
                    self.loadView(new DomainDesignerView({
                        model: domain
                    }));
                } else {
                    //try to find connection by entityId
                    connectionsCollection.fetch().then(function () {
                        var connection = connectionsCollection.get(entityId);

                        if (connection) {
                            self.loadView(new DomainDesignerView({
                                model: new DomainModel({
                                    connections: new ConnectionsCollection(connection)
                                })
                            }));
                        } else {
                            throw "no domain or connection find";
                        }
                    });
                }
            });
        },

        navigateToAdHocDesigner: function (entityId) {
            var adHocCollection = new AdHocCollection(),
                domainsCollection = new DomainsCollection(),
                self = this;

            //try to find adhoc by entityId
            adHocCollection.fetch().then(function () {
                var adhoc = adHocCollection.get(entityId);

                if (adhoc) {
                    self.loadView(new AdHocDesignerView({
                        model: adhoc
                    }));
                } else {
                    //try to find domain by entityId
                    domainsCollection.fetch().then(function () {
                        var domain = domainsCollection.get(entityId);

                        if (domain) {
                            self.loadView(new AdHocDesignerView({
                                model: new AdHocModel({
                                    domain: domain.toJSON()
                                })
                            }));
                        } else {
                            throw "no adhoc or domain find";
                        }
                    });
                }
            });
        },

        loadView: function (view) {
            this.current && this.current.remove();
            this.current = view;
            $('body').html(this.current.$el);
        }
    });
});