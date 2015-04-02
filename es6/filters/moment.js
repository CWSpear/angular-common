angular.module('CWSpearCommon')

    // input:   date | moment:'MM/DD/YYYY'
    // returns: the date formatted with Moment
    .filter('moment', function () {
        return function (date, format) {
            if (!date) return '';

            if (date === 'now') date = moment();
            var m = moment(date);
            var str = m.format(format);

            // manually convert timezones if we can (may not work on all systems?
            // m._d may not be reliable... (work in Chrome, FF, Safari in my testing))
            var matches = str.match(/(-?\d\d:\d\d)$/);
            if (matches && format.match(/Z$/)) {
                var tzMatches = (m._d + '').match(/\(([A-Z]{3})\)$/);
                if (tzMatches) {
                    str = str.replace(matches[1], tzMatches[1]);
                }
            }

            return str;
        };
    });
