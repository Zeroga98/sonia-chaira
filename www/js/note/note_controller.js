app.controller('noteCtrl',function($scope,$rootScope,$location,$state, $ionicHistory){
  //$rootScope.data =JSON.parse(localStorage.getItem("Data"));
  $rootScope.saveNota = function(title,description) {

    var key=$rootScope.data.codeStudent+"v"+$state.params.id;

    if (localStorage.getItem(key) == null) {
      var newNote=[{
        title:title,
        description:description

      }];
      localStorage.setItem(key,JSON.stringify({name:$scope.nameMateria(),notes:newNote }))
    } else {
      console.log(localStorage.getItem(key));
      var notas= JSON.parse(localStorage.getItem(key));
      notas.notes.push({  title:title,description:description});
      localStorage.setItem(key,JSON.stringify(notas));
      console.log(localStorage.getItem(key));
    }



  $ionicHistory.clearCache().then(function(){ $state.go('main.home');});
  };

  $scope.nameMateria = function() {
    for (var i = 0; i < $rootScope.data.schedule.length; i++) {
      if ($rootScope.data.schedule[i].id == $state.params.id) {
        return $rootScope.data.schedule.name;
      }
    }
  };



});
