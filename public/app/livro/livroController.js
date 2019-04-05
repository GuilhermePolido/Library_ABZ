'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('livroController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    let lv = this;
                    $scope.labelTitulo = "Título";
                   // lv.labelPassword = "Senha";
                    lv.message = 'Insira os dados para cadastro do livro';
                   // lv.logged = false;
                   // lv.userName = '';
                    lv.titulo = '';

                    lv.enviar = function() {
                        console.log(lv.titulo);
                    }
    });
})();