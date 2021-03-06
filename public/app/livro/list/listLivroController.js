'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('listLivroController', function (
                $scope, $location, $http, $window, $log, $httpParamSerializer, $timeout, $rootScope, $cookies
                ) {
                    const path = '/api/estante/atual';
                    const pathAllLivros = '/api/livros';

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

                    $http({
                        method: 'GET',
                        url: pathAllLivros,
                        headers: {'x-access-token': $cookies.get('token')}
                    }).then(function succesCallBack(response) {
                        lv.allLivros = response['data'];
                    }, function errorCallBack(response) {
                        lv.allLivros = [];
                    });

                    lv.open = (livro) => {
                        console.log(livro);
                        lv.screen = 1;
                        lv.livro = livro;
                    }

                    lv.edit = (livro) => {
                        console.log(livro);
                        lv.screen = 2;
                        lv.livro = livro;
                    }

                    lv.delete = (livro) => {
                        console.log(livro);
                        lv.livro = livro;
                    }

                    lv.back = () => {
                        lv.screen = 0;
                        lv.livro = null;
                    }

                    lv.emprestar = (livro) => {
                        lv.livro = livro;
                        $http({
                            method: 'GET',
                            url: `/api/usuarios/atual?token=${$cookies.get('token')}`,
                        }).then(function succesCallBack(response) {
                            const {data: dados} = response;
                            lv.user = dados;
                            console.log(lv.user);

                            let data = lv.prepararData();
                            $http({
                                method: 'POST',
                                url: '/api/emprestimo',
                                data: data,
                                headers: {'x-access-token': $cookies.get('token')}
                            }).then(function succesCallBack(response) {
                                console.log(response);
                            }, function errorCallBack(response) {
                                console.log(response);                            
                            });
                            console.log(response);
                        }, function errorCallBack(response) {
                            console.log(response);                            
                        });
                    }

                    lv.reservar = (livro) => {
                        lv.screen = 4;
                        lv.livro = livro;
                    }

                    lv.devolver = (livro) => {
                        lv.livro = livro;
                        $http({
                            method: 'GET',
                            url: `/api/usuarios/atual?token=${$cookies.get('token')}`,
                        }).then(function succesCallBack(response) {
                            const {data: dados} = response;
                            lv.user = dados;
                            console.log(lv.user);

                            let data = lv.prepararData();
                            $http({
                                method: 'POST',
                                url: '/api/devolucao',
                                data: data,
                                headers: {'x-access-token': $cookies.get('token')}
                            }).then(function succesCallBack(response) {
                                console.log(response);
                            }, function errorCallBack(response) {
                                console.log(response);                            
                            });
                            console.log(response);
                        }, function errorCallBack(response) {
                            console.log(response);                            
                        });
                    }

                    lv.prepararData = () => {
                        return {
                            "cd_usuario": lv.user,
	                        "cd_livro": lv.livro.CD_LIVRO
                        };
                    }
    });
})();