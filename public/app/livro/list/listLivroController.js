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

                    $cookies.put('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1aWxoZXJtZXBvbGlkb0BnbWFpbC5jb20iLCJuYW1lIjoiR3VpbGhlcm1lIiwiaWF0IjoxNTU1NDU5MzQzLCJleHAiOjE1NTU1NDU3NDN9._9uXkGJFWBn0hPizgEBaWUu2TcP7lFuv9sYIucv45Aw');

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