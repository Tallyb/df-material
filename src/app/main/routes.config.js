/**
 * Created by Tally on 05/03/2015.
 */

angular.module ('materialLogin')
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl',
      noAuth: true
    })

    .state('home', {
      url: '/home',
      template: 'Your App Starts Here',
      controller: 'homeCtrl'
    })
  ;
    $urlRouterProvider.otherwise('/');

  })


;


