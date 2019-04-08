'use strict';
(function () {
    angular.module('LIBABZ').config(function ($routeProvider, CONFIG, $sceDelegateProvider) {
        $routeProvider
                // .when('/login', {
                //     templateUrl: CONFIG.PATH + 'login/login.html'
                // })
                .when('/livros', {
                    templateUrl: CONFIG.PATH + 'livro/list/listLivros.html'
                })
                .otherwise({redirectTo: '/'});

        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     CONFIG.MENU + 'menu.html'
        // ]);
    });
})();