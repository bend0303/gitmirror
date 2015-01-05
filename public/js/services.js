'use strict';

/**
 * CodeStatus service
 *  @author Ben Diamant
 */
gitMirrorApp.factory('CodeStatusService', function ($http, _, $q) {
    var codeStatus = [];

    function buildCodeStatusObject(codeStatus) {
        var retval = {};

        _.each(codeStatus, function (item) {
            var repohObj = {
                repo: item.repository,
                branch: item.branch,
                last_commit: item.last_commit,
                last_commit_id: item.last_commit_id,
                status: angular.fromJson(item.status),
                last_update: item.last_update

            }
            if (!retval[item.developer_name]) {
                retval[item.developer_name] = [];
            }
            retval[item.developer_name].push(repohObj);
        });
        return retval;
    }

    var service = {
        fetchCodeStatus: function (cb) {

        },

        getCodeStatus: function () {
            var defer = $q.defer();
            $http.get('/status/list').success(function (results) {
                defer.resolve(buildCodeStatusObject(results));
            });

            return defer.promise;
        }
    };

    return service;


});

gitMirrorApp.filter('changeTitle', function() {
    return function(input) {
        var retval;
        retval = input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        retval = retval.replace('_', ' ');
        return retval;
    };
});