angular.module('auth')
  .controller('SignupCtrl', function($scope, $mdToast, $auth, Account, $location) {
    $scope.signup = function() {
      Account.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        appUrl: $location.host()
      }).then (function (response){
        $mdToast.showSimple ('Check your email for a registration confirmation mail');
      }, function (error){
          $mdToast.showSimple (error.data.message);
      });
    };
  });
