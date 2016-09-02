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
      $ionicHistory.clearCache().then(function(){ $state.go('main.home');});

      console.log(localStorage.getItem(key));
    }



  $ionicHistory.clearCache().then(function(){ $state.go('main.home');});
  };

  $rootScope.deleteNota=function(tit,id){
      console.log(tit);
    var del=$rootScope.data.codeStudent+"v"+id;
    var notas= JSON.parse(localStorage.getItem(del));
    $rootScope.$emit('StpaModalAccept');
    notas.notes.splice(tit,1);
    localStorage.setItem(del,JSON.stringify(notas));
    $ionicHistory.clearCache().then(function(){ $state.go('main.home');});
    for (var i = 0; i < $rootScope.subjects.length; i++) {
      if($rootScope.subjects[i].id==id){
        var mat=i;
      }
      console.log(  $rootScope.subjects[i].id);
    }
    $rootScope.subjects[mat].notes.notes.splice(tit,1);
    console.log($rootScope.subjects[0].notes);
  //  console.log(notas.notes);


  }


  $scope.nameMateria = function() {
    for (var i = 0; i < $rootScope.data.schedule.length; i++) {
      if ($rootScope.data.schedule[i].id == $state.params.id) {
        return $rootScope.data.schedule.name;
      }
    }
  };



});
