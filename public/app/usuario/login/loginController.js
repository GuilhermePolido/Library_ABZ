'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('loginController', function (
                $scope, $location, $http, $cookies, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
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
                            $cookies.put('token', response['data'].token);
                            $cookies.put('email', response['data'].data.email);
                            $cookies.put('name', response['data'].data.name);
                            lg.limpar();
                            lg.logando = false;
                        }, function errorCallBack(response) {
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


    });
})();