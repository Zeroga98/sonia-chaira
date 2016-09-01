app.controller('homeCtrl', function($scope, homeService, $state, $rootScope, $ionicSlideBoxDelegate ) {
  console.log("entro");
  $rootScope.data =JSON.parse(localStorage.getItem("Data"));
  console.log($rootScope.data);


  nota=[
    {titulo: "nota 1" , descripcion:''},
    {titulo: "nota 2" , descripcion:''},
    {titulo: "nota 3" , descripcion:''},
    {titulo: "nota 4" , descripcion:''},
    {titulo: "nota 5" , descripcion:''}
  ];

  $rootScope.note=[];
  $scope.week = [
    {
      day:"lunes",
      value: []
    },
    {
      day:"Martes",
      value: []
    },
    {
      day:"Miercoles",
      value: []
    },{
      day:"Jueves",
      value: []
    },{
      day:"Viernes",
      value: []
    },{
      day:"Sabado",
      value: []
    }
  ];
  $rootScope.semana = function() {

    for (var i = 0; i < $rootScope.data.schedule.length; i++) {
      for (var j = 0; j < $rootScope.data.schedule[i].resource.length; j++) {
        var temp = $rootScope.data.schedule[i].resource[j]
        if (temp.day=="Lunes") {
          $scope.week[0].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
          })
        }else if (temp.day=="Martes") {
          $scope.week[1].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }else if (temp.day=="Miercoles") {
          $scope.week[2].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }else if (temp.day=="Jueves") {
          $scope.week[3].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }else if (temp.day=="Viernes") {
          $scope.week[4].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }else if (temp.day=="Sabado") {
          $scope.week[5].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }else if (temp.day=="Domingo") {
          $scope.week[6].value.push({
            id : $rootScope.data.schedule[i].id,
            nameM: $rootScope.data.schedule[i].name,
            hour: temp.hour,
            teacher: temp.teacher,
            resource: temp.resource
              })
        }
      }
    }
  }
  $rootScope.materias= function(){
      for (var i = 0; i < $rootScope.data.schedule.length; i++) {
        console.log("entra");
        $scope.note.push({
        materias:$rootScope.data.schedule[i],
        notes: nota
      })
      }
      localStorage.setItem("Notas", JSON.stringify($scope.note));

  }
  $rootScope.materias();
  $rootScope.semana();

});
