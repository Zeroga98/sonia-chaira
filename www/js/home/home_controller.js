app.controller('homeCtrl', function($scope, homeService, $state, $rootScope, $ionicSlideBoxDelegate, $ionicActionSheet, $location,  $ionicLoading, $ionicHistory) {

  $rootScope.data = JSON.parse(localStorage.getItem("Data"));
    var hoy = new Date().getDay();
  $scope.mostrar=true;

  $scope.visible=function(hol){
      
      if (hol&&localStorage.getItem("login")==null) {
        
        return true;
      }else{
        localStorage.setItem("login", "---");
        return false;
      }

   }

  $scope.week = [{
    day: "lunes",
    value: []
  }, {
    day: "Martes",
    value: []
  }, {
    day: "Miercoles",
    value: []
  }, {
    day: "Jueves",
    value: []
  }, {
    day: "Viernes",
    value: []
  }, {
    day: "Sabado",
    value: []
  }];

  $rootScope.semana = function() {
    for (var i = 0; i < $rootScope.data.schedule.length; i++) {
      for (var j = 0; j < $rootScope.data.schedule[i].resource.length; j++) {
        var temp = $rootScope.data.schedule[i].resource[j]
        if (temp.day == "Lunes") {

          $scope.week[0].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
            init: temp.hour.replace(":","").split(" - ")
          })
          
            $scope.week[0].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Martes") {
          $scope.week[1].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
            init: temp.hour.replace(":","").split(" - ")

          })
           $scope.week[1].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Miercoles") {
          $scope.week[2].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
              init: temp.hour.replace(":","").split(" - ")
          })
           $scope.week[2].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Jueves") {
          $scope.week[3].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
              init: temp.hour.replace(":","").split(" - ")
          })
           $scope.week[3].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Viernes") {
          $scope.week[4].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
              init: temp.hour.replace(":","").split(" - ")
          })
           $scope.week[4].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Sabado") {
          $scope.week[5].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource,
              init: temp.hour.replace(":","").split(" - ")
          })
           $scope.week[5].value.sort(function (a, b) {
              if (a.init > b.init) {
                return 1;
              }
              if (a.init < b.init) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
        } else if (temp.day == "Domingo") {
          $scope.week[6].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        }
      }
    }
  }

  $scope.getNotes=function(id){
    return JSON.parse(localStorage.getItem($rootScope.data.codeStudent+"v"+id))
  };
  $rootScope.fecha=function(npi){
    if (npi!=undefined) {
         var fech= new Date(npi);
        return (fech.toLocaleString());
    }else
        return undefined
  };

  $scope.estatic=[{
      title:"temporal",
      description:"Hola"
    },{title:"temporadasfl",
  description:"hodasf"}];

  $rootScope.materias= function(){
    $rootScope.subjects=[];
      for (var i = 0; i < $rootScope.data.schedule.length; i++) {
        $scope.subjects.push({
        name:$rootScope.data.schedule[i].name,
        id:$rootScope.data.schedule[i].id,
        notes:$scope.getNotes($rootScope.data.schedule[i].id)
      })
     
      //  console.log($scope.subjects[i].id);
      }

  }

  $rootScope.showActionsheet = function() {

    $ionicActionSheet.show({

      titleText: 'Opciones',
      buttons: [{
        text:'<i class="icon ion-ios-person"></i>'+$rootScope.data.nameStudent
      }, {
        text: '<i class="icon ion-ios-information-empty"></i> Acerca de'
      }, ],
      destructiveText: 'Cerrar Sesión',
      cancelText: 'Cancelar',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        if (index==1) {
          swal({   title: "Acerca de",   text: "Trémolo v 1.0 ",   imageUrl: "img/icon.png" });

        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        localStorage.removeItem("token");
        $state.go('login');
        $ionicLoading.hide();
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        return true;
      }
    });
  };
  $scope.next = function() {

    $ionicSlideBoxDelegate.$getByHandle('modalhandle').next();
  };
  $scope.day = function() {

if (hoy==0 || hoy == 1 || hoy==2) {
return 0;  
}
 else{
    if (hoy==3 || hoy == 4) {
      return 1;
    }else{
      if (hoy==5 || hoy ==6) {
        return 2;
      }
    }
  }

};
$scope.myActiveSlide = $scope.day();

  $rootScope.semana();
  $rootScope.materias();
});
