app.controller('homeCtrl', function($scope, homeService, $state, $rootScope, $ionicSlideBoxDelegate, $ionicActionSheet, $location,  $ionicLoading, $ionicHistory) {

  $rootScope.data = JSON.parse(localStorage.getItem("Data"));

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
            resource: temp.resource
          })
        } else if (temp.day == "Martes") {
          $scope.week[1].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        } else if (temp.day == "Miercoles") {
          $scope.week[2].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        } else if (temp.day == "Jueves") {
          $scope.week[3].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        } else if (temp.day == "Viernes") {
          $scope.week[4].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        } else if (temp.day == "Sabado") {
          $scope.week[5].value.push({
            id: $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
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
      console.log($scope.subjects[i].notes);
      //  console.log($scope.subjects[i].id);
      }

  }

  $rootScope.showActionsheet = function() {

    $ionicActionSheet.show({

      titleText: 'Opciones',
      buttons: [{
        text:'<i class="icon ion-ios-person"></i>'+$rootScope.data.nameStudent
      }, {
        text: '<i class="icon ion-arrow-move"></i> Acerca de'
      }, ],
      destructiveText: 'Cerrar Sesión',
      cancelText: 'Cancelar',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
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

  $rootScope.semana();
  $rootScope.materias();
});
