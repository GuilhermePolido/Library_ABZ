'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('indexController', function ($location, $scope, $rootScope, $cookies) {
                    let ic = this;

                    $scope.$on('$locationChangeStart', function(event) {
                        console.log(event)
                        if (!$rootScope.mostrarUser) {
                           $location.path( "/usuario/login" );
                        }
                    });                    

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
                    
                    ic.login = () => {
                        $rootScope.doLogin = true;
                    }
                    
                    ic.verificarLogin();
                    if (!$rootScope.user) {
                        $rootScope.user = {
                            email: $cookies.get('email'),
                            name: $cookies.get('name')
                        };
                    }

    });
})();