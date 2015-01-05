"use strict";


'use strict';

/**
 * Main Controller
 *  @author Ben Diamant
 */
gitMirrorApp.controller('MainCtrl', ['$scope', '$rootScope', '$state','CodeStatusService', function ($scope, $rootScope, $state, CodeStatusService) {
    if ($rootScope.auth == false) {
        $state.go('auth');
    }
    $scope.chosenDeveloper = 'def';
    $scope.chosenDeveloperRepos = [];
    $scope.showRepoSelection = false;
    $scope.$watch('chosenDeveloper', function(newval, oldval) {
        if (newval != 'def') {
            $scope.chosenDeveloperRepos = $scope.codeStatus[newval];
            $scope.showRepoSelection = true;
        } else $scope.showRepoSelection = false;


    });
    CodeStatusService.getCodeStatus().then(function(_codeStatus) {
        $scope.codeStatus = _codeStatus;
        $scope.developers = _.keys($scope.codeStatus);

    });
}]);

/**
 * Auth Controller
 *  @author Ben Diamant
 */
gitMirrorApp.controller('AuthCtrl', ['$scope', '$rootScope', '$state', 'md5', function ($scope, $rootScope, $state, md5) {
    $scope.password = '';
    $scope.passtomathc = '2630ffed2ff99b7af4161b7bd659f209';
    $scope.showBadPass = false;
    $scope.submitForm = function () {
        if (md5.createHash($scope.password) == $scope.passtomathc) {
            $rootScope.auth = true;
            $state.go('main');
        } else $scope.showBadPass = true;
    }
}]);