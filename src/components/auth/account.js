angular.module('auth')

.directive ('userBar', function ($auth, Account){
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'components/auth/partials/user-bar.html',
    link: function (scope, element, attrs) {
      scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
      scope.user = Account.getUser();
    }
  }
})
  .factory('MLStore', function(store) {
    return store.getNamespacedStore('material-login');
  })
  .factory('Account', function($http, DSP_URL, DSP_API_KEY, $auth, MLStore) {
    var profileUrl = DSP_URL+'user/profile'+DSP_API_KEY;

    return {
      setUser: function (user) {
        if (!!user) {
          MLStore.set ('user',user.data );
        } else {
          MLStore.remove ('user');
        }
      },

      getUser: function (){
        return MLStore.get('user');
      },

      getProfile: function() {
        return $http.get(profileUrl);
      },
      updateProfile: function(profileData) {

        return $http.put(profileUrl, profileData).then (function (response){
          MLStore.set ('user', response);
          return response;
        });

      }
    };
  });
