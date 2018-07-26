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
        .state('filiados', {
            url: "/filiados",
            templateUrl: "app/views/filiados.html",
            controller: "filiadosCtrl",
            data: { pageTitle: 'Filiados', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['api/libs/js/plugins/footable/footable.all.min.js', 'api/libs/css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['api/libs/js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['api/libs/js/plugins/sweetalert/sweetalert.min.js', 'api/libs/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['api/libs/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['api/libs/css/plugins/iCheck/custom.css', 'api/libs/js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            files: ['api/libs/js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['api/libs/css/plugins/datapicker/angular-datapicker.css', 'api/libs/js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            files: ['api/libs/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
        })
        .state('filiar', {
            url: "/filiar",
            templateUrl: "app/views/filiar.html",
            controller: "filiarCtrl",
            data: { pageTitle: 'Filiar', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['api/libs/js/plugins/footable/footable.all.min.js', 'api/libs/css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['api/libs/js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['api/libs/js/plugins/sweetalert/sweetalert.min.js', 'api/libs/css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['api/libs/js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['api/libs/css/plugins/iCheck/custom.css', 'api/libs/js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            files: ['api/libs/js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['api/libs/css/plugins/datapicker/angular-datapicker.css', 'api/libs/js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            files: ['api/libs/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
        })
        
}
angular
    .module('candidatooficial')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });