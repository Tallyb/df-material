/**
 * Created by Tally on 27/02/2015.
 */

(function (){

  angular.module( 'authentication', [
    'ui.router',
    'angular-storage',
    'angular-jwt',
    'restangular'
  ])

    .controller ('AuthCtrl', function ($rootScope, $scope, AuthService, $state, store, $mdToast) {
    $rootScope.user = {};
    $scope.loginError = false;
    $scope.login = function() {
      AuthService.login ($scope.user).then (function (response){
        $state.go('auth.login');
      }, function (error){
        $scope.loginError = true;
      });
    };

    $scope.createUser = function () {
      AuthService.createUser($scope.user).then (function (response){
        $state.go('main');
      }, function (error) {
        $scope.loginError = true;
        $state.go('auth.login');
      });
    };


  })

    .factory ('AuthService', function ($http, Restangular, store, jwtHelper, DSP_URL ){
    var user = undefined;

    var setUser = function (user) {
      store.set('jwt', user);
      user = user;
      Restangular.setDefaultRequestParams({
        'X-DreamFactory-Session-Token': user.session_id
      });

    };
    // var jwt = store.get('jwt');
    // var jwtInfo =  jwt && jwtHelper.decodeToken(jwt);

    return {

      login: function (user){
        return $http({
          url: DSP_URL+'rest/user/session',
          method: "POST",
          data: user,
          params: {'app_name':"morffy"}
        })
          .then(function (response) {
          });
      },

      createUser: function (user){
        return $http({
          url: DSP_URL+'rest/user/register',
          method: "POST",
          data: user,
          params: {'app_name':"morffy"}
        })
        .then(function (response) {
            setUser(response);
          });
      },

      logout: function (){
        store.remove('jwt');
        user = {};
      },

      isAuthenticated: function (){
        return !!user; // check token expiry
      },

      getUserInfo: function (){
        return user;
      }
    }
  })

    .directive("passwordVerify", function() {
      return {
        require: "ngModel",
        scope: {
          passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
          scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
              combined = scope.passwordVerify + '_' + ctrl.$viewValue;
            }
            return combined;
          }, function(value) {
            if (value) {
              ctrl.$parsers.unshift(function(viewValue) {
                var origin = scope.passwordVerify;
                if (origin !== viewValue) {
                  ctrl.$setValidity("passwordVerify", false);
                  return undefined;
                } else {
                  ctrl.$setValidity("passwordVerify", true);
                  return viewValue;
                }
              });
            }
          });
        }
      };
    });

})();
