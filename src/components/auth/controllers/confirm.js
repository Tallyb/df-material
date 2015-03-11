/**
 * Created by Tally on 11/03/2015.
 */

angular.module('auth')
  .controller('confirmCtrl', function($scope, $mdToast, $auth, Account, $stateParams) {

    $scope.code = $stateParams.code;
    $scope.email = $stateParams.email;
    $scope.confirm = function (user){
      $auth.signup({
        displayName: $scope.displayName,
        code: $scope.code,
        email: $scope.email,
        password: $scope.password
      }).then (function (response){
        Account.setUser (response)
      }, function (response){
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            $mdToast.showSimple().content (message[0]);
          });
        } else {
          $mdToast.showSimple (response.data.message);
        }
      });

    };

  })
;
