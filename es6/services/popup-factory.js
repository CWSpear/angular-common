(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .factory('popupFactory', popupFactory)

    /**
     * A factory that extends the btfModal factory to create modals
     */
    function popupFactory(btfModal, $q) {
        return function (config) {
            var deferred;

            var modal = btfModal(config);

            modal.open = function () {
                deferred = $q.defer();
                modal.activate();
                return deferred.promise;
            };

            modal.resolve = function (data) {
                deferred.resolve(data);
                modal.deactivate();
            };

            modal.reject = function (data) {
                deferred.reject(data);
                modal.deactivate();
            };

            modal.close = modal.deactivate;

            return modal;
        };
    }
})();
