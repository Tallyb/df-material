angular.module('auth')
  .controller('LoginCtrl', function($scope, $mdToast, $auth, Account) {

    $scope.login = function() {
      $auth.login({
          email: $scope.email,
          password: $scope.password
        })
        .then(function(response) {
          Account.setUser (response);
          $mdToast.showSimple('You have successfully logged in');
        })
        .catch(function(response) {
          $mdToast.showSimple (response.data.message);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {

          $mdToast.showSimple ('You have successfully logged in');
          //$alert({
          //  content: 'You have successfully logged in',
          //  animation: 'fadeZoomFadeDown',
          //  type: 'material',
          //  duration: 3
          //});
        })
        .catch(function(response) {
          $mdToast.showSimple (response.data ? response.data.message : response);
          //$alert({
          //  content: response.data ? response.data.message : response,
          //  animation: 'fadeZoomFadeDown',
          //  type: 'material',
          //  duration: 3
          //});
        });
    };
  });
