'use strict';
(function () {
    angular.module('LIBABZ')
            .controller('listLivroController', function (
                $scope, $location, $http, $window, $log, $httpParamSerializer, $timeout, $rootScope, $cookies
                ) {
                    const path = '/api/livros'
                    let lv = this;
                    lv.livros = null;
                    lv.error = false;
                    lv.loading = true;
                    
                    $http({
                        method: 'GET',
                        url: path,
                        headers: {'x-access-token': $cookies.get('token')}
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