'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('listLivroController', function (
                $scope, $location, $http, $window, $log, $httpParamSerializer, $timeout, $rootScope, $cookies
                ) {
                    const path = '/api/estante/atual'
                    
                    let lv = this;
                    lv.livros = null;
                    lv.error = false;
                    lv.loading = true;

                    //0 - List, 1 - details, 2 - edit, 3 - delete, 4 - reversar, 5 - emprestimo, 6 - devolução.
                    lv.screen = 0;
                    
                    $http({
                        method: 'GET',
                        url: path,
                        headers: {'x-access-token': $cookies.get('token')}
                    }).then(function succesCallBack(response) {
                        lv.livros = response['data'];
                        console.log(lv.livros);
                        lv.error = false;
                        lv.loading = false;
                    }, function errorCallBack(response) {
                        lv.error = true;
                        lv.loading = false;
                    });
                    lv.enviar = () => {
                        lv.salvando = true;
                        let data = lv.prepararData();
                        console.log(data);
                        $http({
                            method: 'POST',
                            url: path,
                            data: data,
                            
                        
                            headers: {'x-access-token': $cookies.get('token')}
                        }).then(function succesCallBack(response) {
                            lv.limpar();
                            lv.salvando = false;
                        }, function errorCallBack(response) {
                            lv.error.push(response['data'].message);
                            lv.salvando = false;
                        });
                    }

                    lv.open = (livro) => {
                        console.log(livro);
                        lv.screen = 1;
                        lv.livro = livro;
                    }

                    lv.edit = (livro) => {
                        console.log(livro);
                        lv.screen = 2;
                        lv.livro = livro;
                        lv.titulo = livro.DS_TITULO;
                        lv.autor = livro.NM_AUTOR;               
                        lv.editor = livro.NM_EDITOR;
                        lv.numPag = livro.NR_PAGINA;
                        lv.classific = livro.NR_CLASSIFICACAO;
                        lv.sumario = livro.DS_SUMARIO;                        

                    }

                    lv.delete = (livro) => {
                        console.log(livro);
                        lv.livro = livro;
                    }

                    lv.back = () => {
                        lv.screen = 0;
                        lv.livro = null;
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