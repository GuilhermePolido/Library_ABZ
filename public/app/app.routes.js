'use strict';
(function () {
    angular.module('LIBABZ').config(function ($routeProvider, CONFIG, $sceDelegateProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: CONFIG.PATH + 'login/login.html'
                })
                .otherwise({redirectTo: '/'});

        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     CONFIG.MENU + 'menu.html'
        // ]);
    });
})();