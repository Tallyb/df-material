'use strict';

angular.module('materialLogin', ['ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'restangular',
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'dfUserManagement',
  'auth'])

  .constant('DSP_URL', 'https://dsp-tallyb.cloud.dreamfactory.com')
  .constant('DSP_API_KEY', 'material-login')

  .config (function appTheme ($mdThemingProvider){
  $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette ('amber');
  })

  .config (function authConfig ($authProvider, DSP_URL){

  $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
  $authProvider.loginOnSignup = true;
  $authProvider.loginRedirect = '/';
  $authProvider.logoutRedirect = '/';
  $authProvider.signupRedirect = '/login';
  $authProvider.loginUrl = DSP_URL+'/rest/user/session';
  $authProvider.signupUrl = DSP_URL+'/rest/user/register';
  $authProvider.loginRoute = '/login';
  $authProvider.signupRoute = '/signup';
  $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.unlinkMethod = 'get';
  $authProvider.authHeader = 'Authorization';
  $authProvider.withCredentials = true; // Send POST request with credentials

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

  .run( function run ($rootScope, $state, $stateParams) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

      //// User isn’t authenticated and the page is not "open authorization"
      //if (!toState.noAuth && !AuthService.isAuthenticated()) {
      //  event.preventDefault();
      //  $state.go('login');
      //}
    });

    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
      console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
    });

    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
      console.log('$stateChangeError - fired when an error occurs during transition.');
      console.log(arguments);
      console.log ("error is: "+error);
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded',function(event){
      console.log('$viewContentLoaded - fired after dom rendered',event);
    });

    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
      console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
      console.log(unfoundState, fromState, fromParams);
    });



  })
;
