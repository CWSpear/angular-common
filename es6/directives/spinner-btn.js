/* globals Ladda */
(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .directive('spinnerBtn', spinnerBtn);

    function spinnerBtn($rootScope) {
        return {
            link: linkFn
        };

        function linkFn($scope, elem, attrs) {
            // set up defaults
            if (!attrs['data-style']) attrs.$set('data-style', 'expand-right');
            if (!attrs['data-size'])  attrs.$set('data-size', 'xs');
            if (!attrs['data-spinner-color'])  attrs.$set('data-spinner-color', '#999');

            elem.addClass('ladda-button');

            var ladda = Ladda.create(elem[0]);

            $rootScope.$on('form:submitting', function (event, val) {
                if (val) ladda.start();
                else ladda.stop();
            });
        }
    }
})();
