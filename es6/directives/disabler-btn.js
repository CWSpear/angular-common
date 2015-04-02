(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .directive('disablerBtn', disablerBtn);

    function disablerBtn($rootScope) {
        var directive = {
            link: linkFn
        };

        return directive;

        function linkFn($scope, elem) {
            $rootScope.$on('form:submitting', function (event, val) {
                if (val) elem.prop('disabled', true);
                else elem.prop('disabled', false);
            });
        }
    }
})();
