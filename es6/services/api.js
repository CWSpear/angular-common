(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .config(apiConfig)
        .factory('api', apiFactory)
        .constant('apiConfig', {
            base: '/api'
        });

    function apiConfig(RestangularProvider, $httpProvider, csrfToken, apiConfig) {
        // all API routes go through /api at the base
        RestangularProvider.setBaseUrl(apiConfig.base);

        $httpProvider.defaults.headers.common['X-Timezone'] = moment().format('Z');

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.defaults.headers.post['X-XSRF-TOKEN'] = csrfToken;
        $httpProvider.defaults.headers.put['X-XSRF-TOKEN'] = csrfToken;
        $httpProvider.defaults.headers.patch['X-XSRF-TOKEN'] = csrfToken;
        if (!$httpProvider.defaults.headers.delete) $httpProvider.defaults.headers.delete = {};
        $httpProvider.defaults.headers.delete['X-XSRF-TOKEN'] = csrfToken;
    }

    function apiFactory($rootScope, Restangular, $http, apiConfig, $state, $location, $q) {
        var api = Restangular.withConfig(angular.noop);

        api.get = get;
        api.post = post;
        api.put = put;
        api.delete = del;

        api.cacher = initCacher();
        api.setErrorInterceptor(apiErrorHandler);

        return api;

        function get(url, config) {
            return unwrapResponse($http.get(wrapUrl(url), config));
        }

        function post(url, data, config) {
            return unwrapResponse($http.post(wrapUrl(url), data, config));
        }

        function put(url, data, config) {
            return unwrapResponse($http.put(wrapUrl(url), data, config));
        }

        function del(url, config) {
            return unwrapResponse($http.delete(wrapUrl(url), config));
        }

        function initCacher() {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setDefaultHttpFields({
                    cache: true
                });
            });
        }

        function apiErrorHandler(response) {
            $rootScope.globalErrorHandler(response);

            if (response.status === 401 && !$location.url().match(/^\/login\//)) {
                var queryParams = { redirect: $location.url() };
                $state.go('login', queryParams);

                // error "handled"
                return false;
            }

            if (response.status === 403) {
                $state.go('home');

                // error "handled"
                return false;
            }

            // error "not handled"
            return true;
        }

        function unwrapResponse(promise) {
            return promise.then(function (response) {
                return response.data;
            }, function (response) {
                $rootScope.globalErrorHandler(response);
                // return the rejection up the chain
                return $q.reject(response);
            });
        }

        function wrapUrl(url) {
            return apiConfig.base + '/' + url;
        }
    }
})();
