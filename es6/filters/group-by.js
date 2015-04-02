(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .filter('groupBy', groupBy);

    function groupBy() {
        return function (items, group) {
            return _.groupBy(items, group);
        };
    }
})();
