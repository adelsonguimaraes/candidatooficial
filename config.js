function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    // $urlRouterProvider.otherwise("/home");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
            data: { pageTitle: 'Home', specialClass: 'gray-bg'},
        })
        
}
angular
    .module('candidatooficial')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });