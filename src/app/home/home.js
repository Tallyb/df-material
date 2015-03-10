/**
 * Created by Tally on 10/03/2015.
 */

angular.module ('material-login')
  .controller('homeCtrl', function ($scope, homeSvc){
    $scope.todos = homeSvc.getAll();
  })


  .factory ('homeSvc', function (DSP_URL, DSP_API_KEY, $http ){
  var todos = DSP_URL+'db/Todos'+DSP_API_KEY;

  return {
    getAll: function (){
      return $http.get(todos).then (function (response){
        return response;
      });
    }
  };


});

