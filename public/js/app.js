"use strict";


angular.module('underscore', []).factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});

var gitMirrorApp = angular.module('gitMirrorApp', [
    'ui.router',
    'ui.bootstrap', 'underscore'
]);

gitMirrorApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/auth");
    $stateProvider
        .state('auth', {
            url: "/auth",
            controller: 'AuthCtrl',
            templateUrl: "views/auth.html",
            data: {pageTitle: 'Auth view'}
        })
        .state('main', {
            url: "/main",
            controller: 'MainCtrl',
            templateUrl: "views/main.html",
            data: {pageTitle: 'Main view'}
        });
}).run(function ($rootScope, $state, CodeStatusService) {
    $rootScope.$state = $state;
    $rootScope.auth = false;
});
