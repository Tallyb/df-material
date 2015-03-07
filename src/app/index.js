'use strict';

angular.module('materialLogin', ['ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'restangular',
  'ui.router',
  'ngMaterial',
  'dfUserManagement',
  'authentication'])

  .constant('DSP_URL', 'https://dsp-tallyb.cloud.dreamfactory.com/')
  .constant('DSP_API_KEY', 'material-login')

  .config (function appTheme ($mdThemingProvider){
  $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette ('amber');
  })

  .config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY) {

    $httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
  }])

  .config (function (RestangularProvider, DSP_URL, DSP_API_KEY){

  RestangularProvider.setBaseUrl(DSP_URL);
  RestangularProvider.setDefaultRequestParams({'X-DreamFactory-Application-Name': DSP_API_KEY});
  RestangularProvider.setErrorInterceptor(function(response, promise, $mdToast) {
    $mdToast.showSimple('Error: ' + response.text);
  });
})

  .run( function run ($rootScope, $state, $stateParams, AuthService) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

      //// User isn’t authenticated and the page is not "open authorization"
      //if (!toState.noAuth && !AuthService.isAuthenticated()) {
      //  event.preventDefault();
      //  $state.go('login');
      //}
    });

  })
;
