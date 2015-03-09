'use strict';

angular.module('materialLogin')
  .controller('NavbarCtrl', function ($scope, $auth) {
    $scope.date = new Date();
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });
