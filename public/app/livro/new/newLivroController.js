'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('newLivroController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    let lv = this;
                    lv.message = 'Insira os dados para cadastro do livro';
                    lv.titulo = '';
                    lv.autor = '';
                    lv.editor = '';
                    lv.numPag = '';
                    lv.classific = '';
                    lv.sumario = '';
                    lv.dataManut = ''; //Data da ultima atualização
                    lv.estante = ''; //Pegar estante do professor logado
                    lv.status = '0';

                    lv.enviar = function() {
                        console.log(lv);
                    }
    });
})();