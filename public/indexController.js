'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('indexController', function ($scope, $rootScope, $cookies) {
                    let ic = this;
                    console.log($cookies.get('token'))
                    

                    ic.logout = () => {
                        $cookies.remove('token');
                        $cookies.remove('email');
                        $cookies.remove('name');
                        ic.verificarLogin();
                    }

                    ic.verificarLogin = () => {
                        if ($cookies.get('token')) {
                            $rootScope.mostrarUser = true;
                        } else {
                            $rootScope.mostrarUser = false;
                        }    
                    }
                    ic.verificarLogin();


    });
})();