/**
 * Created by Tally on 06/03/2015.
 */

angular.module( 'authentication')
.config (function ($stateProvider){

  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'components/auth/views/auth.html',
      controller: 'AuthCtrl',
      noAuth: true
    })

    .state('auth.login', {
      url: '/login',
      templateUrl: 'components/auth/views/login.html',
      noAuth: true
    })
    .state('auth.logout', {
      url: '/logout',
      templateUrl: 'components/auth/views/logout.html',
      noAuth: true
    })

    .state('auth.register', {
      url: '/register',
      templateUrl: 'components/auth/views/register.html',
      noAuth: true
    })
    .state('auth.profile', {
      url: '/profile',
      templateUrl: 'components/auth/views/profile.html',
      noAuth: true
    })

    .state('auth.resetPassword', {
      url: '/resetPassword',
      templateUrl: 'components/auth/views/password-reset.html',
      noAuth: true
    })

});
