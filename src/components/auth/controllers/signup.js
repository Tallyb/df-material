angular.module('auth')
  .controller('SignupCtrl', function($scope, $mdToast, $auth, Account) {
    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
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
  });
