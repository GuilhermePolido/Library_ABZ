'use strict';
(function () {
    angular.module('LIBABZ')
        .controller('devolucaoController', function (
            $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope, $routeParams
            ) {
                const path = '/api/livros'
                const params = $routeParams;
                let lv = this;
                lv.livroId = params.id;
                lv.usuario = '';
                lv.dataDevolucao = '';
                lv.emprestimo = 1;
                console.log(lv.livroId);

                $scope.openCalendar = function() {
                    $scope.popup.opened = !$scope.popup.opened;
                };

                $scope.popup = {
                    opened: false
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };
                    
            });
})();