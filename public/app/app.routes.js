'use strict';
(function () {
    angular.module('LIBABZ').config(function ($routeProvider, CONFIG, $sceDelegateProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: CONFIG.PATH + 'login/login.html'
                })
                .when('/livro', {
                    templateUrl: CONFIG.PATH + 'livro/livro.html'
                })
                .when('/livro/new', {
                    templateUrl: CONFIG.PATH + 'livro/new/newLivro.html'
                })
                .otherwise({redirectTo: '/'});

        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     CONFIG.MENU + 'menu.html'
        // ]);
    });
})();