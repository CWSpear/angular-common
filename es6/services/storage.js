/* globals localStorage */
(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .factory('storage', storage);

    function storage($log) {
        var factory = {
            sync: loadAndMakePersistent,
            get: getFromLocalStorage,
            set: putInLocalStorage,
            remove: deleteFromLocalStorage
        };

        return factory;

        function putInLocalStorage(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        }

        function getFromLocalStorage(key) {
            var value = localStorage.getItem(key);
            return JSON.parse(value);
        }

        function deleteFromLocalStorage(key) {
            if (!angular.isDefined(key)) localStorage.clear();
            else localStorage.removeItem(key);
        }

        function loadAndMakePersistent(key, fallback) {
            return function ($scope) {
                // attempt to load from storage if it doesn't exist (make this method safe to call multiple times)
                if (!$scope[key]) {
                    $scope[key] = getFromLocalStorage(key);
                    $log.debug('No ' + key + ': load from storage');
                }

                // if STILL not loaded, fall back to fallback
                if (!$scope[key]) {
                    $scope[key] = fallback;
                    $log.debug('Still no ' + key + ': init from fallback:', fallback);
                }

                // watch this variable and save it to storage if it changes
                $scope.$watch(key, function (value) {
                    putInLocalStorage(key, value);
                }, true);
            };
        }
    }
})();
