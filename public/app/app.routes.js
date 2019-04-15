'use strict';
(function () {
    angular.module('LIBABZ').config(function ($routeProvider, CONFIG, $sceDelegateProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: CONFIG.PATH + 'home/home.html'
                })
                .when('/login', {
                    templateUrl: CONFIG.PATH + 'login/login.html'
                })
                .when('/livros', {
                    templateUrl: CONFIG.PATH + 'livro/list/listLivros.html'
                })
                .when('/livros/new', {
                    templateUrl: CONFIG.PATH + 'livro/new/newLivro.html'
                })
                .when('/livros/reserva', {
                    templateUrl: CONFIG.PATH + 'livro/reserva/reserva.html'
                })
                .when('/livros/reserva/:id', {
                    templateUrl: CONFIG.PATH + 'livro/reserva/reserva.html'
                })
                .otherwise({redirectTo: '/'});

        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     CONFIG.MENU + 'menu.html'
        // ]);
    });
})();