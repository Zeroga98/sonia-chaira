  app.controller('noteCtrl',function($scope,$rootScope,$location,$state, $ionicHistory,$cordovaLocalNotification){
  //$rootScope.data =JSON.parse(localStorage.getItem("Data"));
 
$scope.notas={
  title:"",
  description:""

};

$rootScope.fecha=function(npi){
    if (npi!=undefined) {
         var fech= new Date(npi);
        return (fech.toLocaleString());
    }else
        return undefined
  };

 $scope.valid = function() {
    return ($scope.notas.title.length > 1 && $scope.notas.description .length > 1);
  }



$scope.scheduleDelayedNotification = function (title,description,fecha) {   
   $cordovaLocalNotification.getAll().then(function(resulr) { //Buscar el id maximo
        var idMax = 0;
        for (var i = 0; i < resulr.length; i++) {
            if (idMax < resulr[i].id) {
                idMax = resulr[i].id;
                console.log("hola"+ idMax);
            }
        }
        $scope.idNotification = (idMax + 1);
        console.log($scope.idNotification);
            });

        $cordovaLocalNotification.schedule({
                id: fecha.valueOf(),
                title: title,
                text: description,
                icon: "../img/icon.png",
                at: fecha
            }
        ).then(function (result) {   });                           
                       
                
        };  
  

  $rootScope.saveNota = function(title,description,fecha,time) {

    var key=$rootScope.data.codeStudent+"v"+$state.params.id;
    $scope.id=$scope.id+1;

     if ($scope.config && fecha!=undefined) {
      fecha.setHours(time.getHours());
      fecha.setMinutes(time.getMinutes());
      fecha.setSeconds(time.getSeconds());
      
     $scope.scheduleDelayedNotification(title,description,fecha);
      //  $scope.scheduleDelayedNotification(fecha,time);
      }
      
    if (localStorage.getItem(key) == null) {
      var newNote=[{
        title:title,
        description:description,
        fecha:fecha,
      
      }];

      localStorage.setItem(key,JSON.stringify({name:$scope.nameMateria(),notes:newNote }))
      $ionicHistory.clearCache().then(function(){ $state.go('main.home');});
    } else {
      //console.log(localStorage.getItem(key));
      var notas= JSON.parse(localStorage.getItem(key));
      notas.notes.push({  title:title,description:description,fecha:fecha});

      localStorage.setItem(key,JSON.stringify(notas));
      $ionicHistory.clearCache().then(function(){ $state.go('main.home');});

    
    }
    

 
  };



$scope.config=false;
    
    $scope.activeConfig= function(config){
      if (!$scope.config) {
        $scope.config= true;
      }else{
        $scope.config=false;
      }

    }


   $rootScope.goback= function () {
      console.log("si");
      $ionicHistory.goBack();
    }


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
 //   console.log($rootScope.subjects[0].notes);
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
