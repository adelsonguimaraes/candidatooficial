function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    $urlRouterProvider.otherwise("/home");

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
        
}
angular
    .module('candidatooficial')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });