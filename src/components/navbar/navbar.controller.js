'use strict';

angular.module('materialLogin')
  .controller('NavbarCtrl', function ($scope, AuthService) {
    $scope.date = new Date();
    $scope.user = function (){
      return AuthService.getUserInfo();
    };
  });
