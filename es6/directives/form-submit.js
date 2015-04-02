(function () {
    'use strict';

    angular
        .module('CWSpearCommon')
        .directive('formSubmit', formSubmit);

    function formSubmit($parse, postman, $q, $rootScope) {
        return {
            restrict: 'A',
            require:  'form',
            compile:  compileFn
        };

        function compileFn($element, $attrs) {
            var fn = $parse($attrs.formSubmit, null, true);

            return linkFn;

            function linkFn(scope, elem, attrs, form) {
                elem.on('submit', function (event) {
                    event.preventDefault();
                    scope.$apply(() => handleFormErrors(event));
                });

                if (!form.$shouldShowErrors) {
                    form.$shouldShowErrors = function () {
                        return form.$invalid && form.$showErrors;
                    }
                }

                function handleFormErrors(event) {
                    form.$showErrors = false;
                    if (form.$invalid) {
                        form.$showErrors = true;
                        postman.error('Form Errors', 'Please correct errors and resubmit');
                    } else {
                        $rootScope.$broadcast('form:submitting', true);
                        $q.when(fn(scope, { $event: event }))['finally'](function () {
                            $rootScope.$broadcast('form:submitting', false);
                        });
                    }
                }
            }
        }
    }
})();
