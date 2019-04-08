'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('loginController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    let lg = this;
                    lg.labelUser = "Usuario";
                    lg.labelPassword = "Senha";
                    lg.message = 'Insira suas credenciais para logar';
                    lg.logged = false;
                    lg.userName = '';
                    lg.password = '';

                    lg.enviar = function() {
                        console.log(lg.userName);
                        console.log(lg.password);
                    }
    });
})();