/**
 * Created by Tally on 05/03/2015.
 */

angular.module ('materialLogin')
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    ;
    $urlRouterProvider.otherwise('/');

})


;


