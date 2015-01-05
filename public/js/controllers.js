"use strict";


'use strict';

/**
 * Main Controller
 *  @author Ben Diamant
 */
gitMirrorApp.controller('MainCtrl', ['$scope', '$rootScope', '$state','CodeStatusService', function ($scope, $rootScope, $state, CodeStatusService) {
    //if ($rootScope.auth == false) {
    //    $state.go('auth');
    //}
    $scope.chosenDevloper = 'def';
    $scope.chosenDeveloperRepos = [];
    $scope.showRepoSelection = false;
    $scope.$watch('chosenDevloper', function(newval, oldval) {
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
gitMirrorApp.controller('AuthCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
    $scope.password = '';
    $scope.submitForm = function () {
        if ($scope.password == 'a') {
            $rootScope.auth = true;
            $state.go('main');
        }
    }
}]);