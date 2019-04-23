'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('newUsuarioController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    const path = '/api/usuarios/'
                    let user = this;
                    user.usuario = '';
                    user.email = '';
                    user.senha = '';
                    user.senha2 = '';
                    user.nome = '';
                    user.telefone = '';
                    user.error = [];
                    user.success = [];

                    user.salvando = false;

                    user.enviar = () => {
                        user.salvando = true;
                        let data = user.prepararData();

                        $http({
                            method: 'POST',
                            url: path,
                            data: data
                        }).then(function succesCallBack(response) {
                            user.limpar();
                            user.success.push(response.data);
                            user.salvando = false;
                            $rootScope.doLogin = true;
                        }, function errorCallBack(response) {
                            user.error.push(response['data'].message);
                            user.salvando = false;
                        });
                    }

                    user.limpar = () => {
                        user.usuario = '';
                        user.email = '';
                        user.senha = '';
                        user.senha2 = '';
                        user.nome = '';
                        user.telefone = '';
                        user.error = [];
                    }

                    user.prepararData = () => {
                        return {
                            "CD_USUARIO": user.usuario,
                            "DS_EMAIL": user.email,
                            "ds_senha": user.senha,
                            "NM_USUARIO": user.nome,
                            "NR_TELEFONE": user.telefone
                        };
                    }

                    user.login = () => {
                        $rootScope.doLogin = true;
                        user.limpar();
                    }
    });
})();