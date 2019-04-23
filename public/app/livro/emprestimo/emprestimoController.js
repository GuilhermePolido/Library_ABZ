'use strict';
(function () {
    angular.module('LIBABZ')
        .controller('emprestimoController', function (
            $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope, $routeParams
            ) {
                const path = '/api/livros';
                const params = $routeParams;
                let lv = this;
                lv.livroId = params.id;
                lv.usuario = '';
                lv.dataEmprestimo = '';
                lv.dataDevolucao = '';
                lv.error = [];
                lv.salvando = false;
                console.log(lv.livroId);

                $scope.openCalendar1 = function() {
                    $scope.popup1.opened = !$scope.popup1.opened;
                };

                $scope.openCalendar2 = function() {
                    $scope.popup2.opened = !$scope.popup2.opened;
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };
               
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
                        lv.error = [];
                    });
                }

                lv.limpar = () => {
                    lv.dataEmprestimo = '';
                    lv.dataDevolucao = '';
                    lv.error = [];
                }

                lv.prepararData = () => {
                    return {
                        "CD_EMPRESTIMO": 1,
                        "DT_DEVOLUCAO": lv.dataDevolucao,
                        "CD_USUARIO": 1,
                        "DT_EMPRESTIMO": lv.dataEmprestimo,
                        "DT_MANUTENCAO": 1,
                        "LIVRO_CD_LIVRO": lv.livroId,
                    };
                }
            });
})();