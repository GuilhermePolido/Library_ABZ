'use strict';
(function () {
    angular.module('LIBABZ').config(function ($routeProvider, CONFIG, $sceDelegateProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: CONFIG.PATH + 'home/home.html'
                })
                .when('/livros', {
                    templateUrl: CONFIG.PATH + 'livro/list/listLivros.html'
                })
                .when('/livros/new', {
                    templateUrl: CONFIG.PATH + 'livro/new/newLivro.html'
                })
                .when('/livros/reserva/:id', {
                    templateUrl: CONFIG.PATH + 'livro/reserva/reserva.html'
                })
                .when('/livros/emprestimo/:id', {
                    templateUrl: CONFIG.PATH + 'livro/emprestimo/emprestimo.html'
                })
                .when('/livros/devolucao/:id', {
                    templateUrl: CONFIG.PATH + 'livro/devolucao/devolucao.html'
                })
                .when('/usuario/login', {
                    templateUrl: CONFIG.PATH + 'usuario/login/login.html'
                })
                .otherwise({redirectTo: '/'});

        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     CONFIG.MENU + 'menu.html'
        // ]);
    });
})();