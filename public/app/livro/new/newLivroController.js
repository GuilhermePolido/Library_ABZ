'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('newLivroController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    const path = '/api/livros'
                    let lv = this;
                    lv.titulo = '';
                    lv.autor = '';
                    lv.editor = '';
                    lv.numPag = '';
                    lv.classific = '';
                    lv.sumario = '';
                    lv.estante = ''; //Pegar estante do professor logado
                    lv.status = '0';
                    lv.error = [];
                    lv.salvando = false;

                    lv.enviar = () => {
                        lv.salvando = true;
                        let data = lv.prepararData();

                        $http({
                            method: 'POST',
                            url: path,
                            data: data
                        }).then(function succesCallBack(response) {
                            lv.limpar();
                            lv.salvando = false;
                        }, function errorCallBack(response) {
                            lv.error.push(response['data'].message);
                            lv.salvando = false;
                        });
                    }

                    lv.limpar = () => {
                        lv.titulo = '';
                        lv.autor = '';
                        lv.editor = '';
                        lv.numPag = '';
                        lv.classific = '';
                        lv.sumario = '';
                        lv.error = [];
                    }

                    lv.prepararData = () => {
                        return {
                            "CD_ESTANTE": 1,
                            "DS_SUMARIO": lv.sumario,
                            "DS_TITULO": lv.titulo,
                            "NM_AUTOR": lv.autor,
                            "NM_EDITOR": lv.editor,
                            "NR_CLASSIFICACAO": lv.classific,
                            "NR_PAGINA": lv.numPag,
                            ST_LIVRO: lv.status
                        };
                    }
    });
})();