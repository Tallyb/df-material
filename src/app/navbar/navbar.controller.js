'use strict';

angular.module ('materialLogin').directive ('navBar', function ($auth, Account){
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'app/navbar/navbar.html',
    link: function (scope, element, attrs) {
      scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
      scope.user = Account.getProfile();
    }
  }
});

//angular.module('materialLogin')
//  .controller('NavbarCtrl', function ($scope, $auth, Account) {
//    $scope.isAuthenticated = function() {
//      return $auth.isAuthenticated();
//    };
//    $scope.user = Account.getProfile();
//  });
