angular.module('auth')
  .controller('LogoutCtrl', function($auth, $mdToast, Account) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout()
      .then(function() {
        Account.setUser(undefined);
        $mdToast.showSimple ('You have been logged out');
      });
  });
