function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    $urlRouterProvider.otherwise("/panel");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/views/home.html",
            controller: "homeCtrl",
            data: { pageTitle: 'Home', specialClass: 'gray-bg'},
        })
        .state('login', {
            url: "/login",
            templateUrl: "app/views/login.html",
            controller: "loginCtrl",
            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
        })
        .state('panel', {
            url: "/panel",
            templateUrl: "app/views/panel.html",
            controller: "panelCtrl",
            data: { pageTitle: 'Painel', specialClass: 'gray-bg' },
        })
        .state('lideres', {
            url: "/lideres",
            templateUrl: "app/views/lideres.html",
            controller: "lideresCtrl",
            data: { pageTitle: 'Lideres', specialClass: 'gray-bg' },
        })
        
}
angular
    .module('candidatooficial')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });