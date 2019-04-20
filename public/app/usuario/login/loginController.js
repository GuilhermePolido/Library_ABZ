'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('loginController', function (
                $scope, $location, $http, $cookies, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    $rootScope.doLogin = true;
                    const path = '/api/usuarios/login'
                    let lg = this;
                    lg.logando = false;
                    lg.userName = '';
                    lg.password = '';

                    lg.login = () => {
                        lg.logando = true;
                        let data = lg.prepararData();

                        $http({
                            method: 'POST',
                            url: path,
                            data: data
                        }).then(function succesCallBack(response) {
                            console.log(response);
                            $rootScope.mostrarUser = true;
                            $rootScope.user.email = response['data'].data.email;
                            $rootScope.user.name = response['data'].data.name;
                            $cookies.put('token', response['data'].token);
                            $cookies.put('email', response['data'].data.email);
                            $cookies.put('name', response['data'].data.name);
                            lg.limpar();
                            lg.logando = false;
                            $location.path('#/');
                            $location.replace();
                        }, function errorCallBack(response) {
                            $rootScope.mostrarUser = false;
                            $rootScope.user = null;
                            $cookies.remove('token');
                            $cookies.remove('email');
                            $cookies.remove('name');
                            lg.error.push(response['data'].message);
                            lg.logando = false;
                        });
                    }

                    lg.limpar = () => {
                        lg.userName = '';
                        lg.password = '';
                    }

                    lg.prepararData = () => {
                        return {
                            "ds_email": lg.userName,
                            "ds_senha": lg.password
                        };
                    }

                    lg.criar = () => {
                        $rootScope.doLogin = false;
                    }

    });
})();