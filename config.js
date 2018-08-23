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
        .state('zonas', {
            url: "/zonas",
            templateUrl: "app/views/zonas.html",
            controller: "zonasCtrl",
            data: { pageTitle: 'Zonas', specialClass: 'gray-bg' },
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
        .state('panel', {
            url: "/panel",
            templateUrl: "app/views/panel.html",
            controller: "panelCtrl",
            data: { pageTitle: 'Painel', specialClass: 'gray-bg' },
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
        .state('lideres', {
            url: "/lideres",
            templateUrl: "app/views/lideres.html",
            controller: "lideresCtrl",
            data: { pageTitle: 'Lideres', specialClass: 'gray-bg' },
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
        .state('campanhas', {
            url: "/campanhas",
            templateUrl: "app/views/campanhas.html",
            controller: "campanhasCtrl",
            data: { pageTitle: 'Campanhas', specialClass: 'gray-bg' },
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
        .state('tipolider', {
            url: "/tipolider",
            templateUrl: "app/views/tipolider.html",
            controller: "tipoliderCtrl",
            data: { pageTitle: 'Tipo Lider', specialClass: 'gray-bg' },
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
        .state('bairro', {
            url: "/bairro",
            templateUrl: "app/views/bairro.html",
            controller: "bairroCtrl",
            data: { pageTitle: 'Bairro', specialClass: 'gray-bg' },
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
        .state('usuario', {
            url: "/usuario",
            templateUrl: "app/views/usuario.html",
            controller: "usuarioCtrl",
            data: { pageTitle: 'Usuário', specialClass: 'gray-bg' },
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
        .state('funcao', {
            url: "/funcao",
            templateUrl: "app/views/funcao.html",
            controller: "funcaoCtrl",
            data: { pageTitle: 'Funções', specialClass: 'gray-bg' },
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
        .state('grupos', {
            url: "/grupos",
            templateUrl: "app/views/grupo.html",
            controller: "grupoCtrl",
            data: { pageTitle: 'Funções', specialClass: 'gray-bg' },
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
        .state('appkeys', {
            url: "/appkeys",
            templateUrl: "app/views/appkeys.html",
            controller: "appkeysCtrl",
            data: { pageTitle: 'Funções', specialClass: 'gray-bg' },
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