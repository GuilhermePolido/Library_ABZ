'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('newUsuarioController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    const path = '/api/usuario'
                    let user = this;
                    user.titulo = '';
                    user.autor = '';
                    user.editor = '';
                    user.numPag = '';
                    user.classific = '';
                    user.sumario = '';
                    user.estante = ''; //Pegar estante do professor logado
                    user.status = '0';
                    user.error = [];
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
                            user.salvando = false;
                        }, function errorCallBack(response) {
                            user.error.push(response['data'].message);
                            user.salvando = false;
                        });
                    }

                    user.limpar = () => {
                        user.titulo = '';
                        user.autor = '';
                        user.editor = '';
                        user.numPag = '';
                        user.classific = '';
                        user.sumario = '';
                        user.error = [];
                    }

                    user.prepararData = () => {
                        return {
                            "CD_ESTANTE": 1,
                            "DS_SUMARIO": user.sumario,
                            "DS_TITULO": user.titulo,
                            "NM_AUTOR": user.autor,
                            "NM_EDITOR": user.editor,
                            "NR_CLASSIFICACAO": user.classific,
                            "NR_PAGINA": user.numPag,
                            ST_LIVRO: user.status
                        };
                    }
    });
})();