'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('newLivroController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope, CONFIG
                ) {
                    const PATH = {
                        livros: CONFIG._API_ + '/livros',
                        disciplinas: CONFIG._API_ + '/disciplina'
                    };

                    let lv = this;
                    lv.allDisciplinas = [];
                    lv.disciplinas = [];
                    lv.disciplina;
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
                            url: PATH.livros,
                            data: data
                        }).then(function succesCallBack(response) {
                            lv.limpar();
                            lv.salvando = false;
                        }, function errorCallBack(response) {
                            const {data} = response;
                            lv.error.push(data.message);
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

                    lv.getDisciplinas = () => {
                        $http({
                            method: 'GET',
                            url: PATH.disciplinas
                        }).then(function succesCallBack(response) {
                            const {data} = response;
                            lv.allDisciplinas = data;
                            console.log(data);
                        }, function errorCallBack(response) {
                            console.log(response);
                        });
                    }

                    lv.addDisciplina = () => {
                        lv.disciplinas.push(lv.disciplina);
                        lv.disciplina = undefined;
                    }

                    lv.getDisciplinas();
    });
})();