(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .directive('uiView', loading);

    function loading() {
        var directive = {
            controller: loadingCtrl
        };

        return directive;
    }

    /* @ngInject */
    function loadingCtrl($scope, $element) {
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // we only want the most child ui-view to trigger a load animation!
            if (!$element[0].querySelector('[ui-view]'))
                $element.addClass('loading');
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $element.removeClass('loading');
        });
    }
})();
