'use strict';
(function () {
    angular.module('LIBABZ', ['ngRoute', 'ui.mask', 'ngAnimate', 'ui.bootstrap', 'ngSanitize'])
            .constant('CONFIG', {PATH: 'app/', _API_: '/api'});
})();