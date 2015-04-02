(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .directive('disableForm', disableForm);

    function disableForm() {
        var directive = {
            link: linkFn
        };

        return directive;

        function linkFn(scope, elem, attrs) {
            var disabled = scope.$eval(attrs.disableForm);
            disable(disabled);

            scope.$watch(attrs.disableForm, (val, oldVal) => {
                if (val == oldVal) return;

                disable(val);
            });

            scope.$watch(() => _.keys(((elem || [])[0] || {}).elements || []).join(''), (val, oldVal) => {
                if (val == oldVal) return;

                disable(disabled);
            });

            function disable(disabled) {
                _.each(elem[0].elements, element => {
                    // let elements with their own ng-disabled override this directive
                    if (!element.attributes['ng-disabled'])
                        element.disabled = disabled;
                });
            }
        }
    }
})();
