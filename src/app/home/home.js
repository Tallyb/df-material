/**
 * Created by Tally on 10/03/2015.
 */

angular.module ('materialLogin')
  .controller('homeCtrl', function ($scope, homeSvc){
    homeSvc.getAll().then (function (response){
      $scope.todos = response;
    });
  })


  .factory ('homeSvc', function (DSP_URL, DSP_API_KEY, $http ){
  var todos = DSP_URL+'db/todo'+DSP_API_KEY;

  return {
    getAll: function (){
      return $http.get(todos).then (function (response){
        return response.data.record;
      });
    }
  };


});

