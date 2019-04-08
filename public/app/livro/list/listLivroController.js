'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('listLivroController', function (
                $scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope
                ) {
                    const path = '/api/livros'
                    let lv = this;
                    lv.livros = null;
                    lv.error = false;
                    lv.loading = true;

                    $http({
                        method: 'GET',
                        url: path
                    }).then(function succesCallBack(response) {
                        lv.livros = response['data'];
                        lv.error = false;
                        lv.loading = false;
                    }, function errorCallBack(response) {
                        lv.error = true;
                        lv.loading = false;
                    });
    });
})();