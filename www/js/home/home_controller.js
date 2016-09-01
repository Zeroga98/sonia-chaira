app.controller('homeCtrl', function($scope, homeService, $state, $rootScope, $ionicSlideBoxDelegate,$ionicActionSheet,$location) {
  console.log("entro");
  $rootScope.data =JSON.parse(localStorage.getItem("Data"));
  console.log($rootScope.data);


  nota=[ ];

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

  $scope.showActionsheet = function() {

   $ionicActionSheet.show({
     titleText: 'ActionSheet Example',
     buttons: [
       { text: '<i class="icon ion-share"></i> Share' },
       { text: '<i class="icon ion-arrow-move"></i> Move' },
     ],
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
       console.log('CANCELLED');
     },
     buttonClicked: function(index) {
       console.log('BUTTON CLICKED', index);
       return true;
     },
     destructiveButtonClicked: function() {
       console.log('DESTRUCT');
       return true;
     }
   });
 };
 $scope.next = function() {

     $ionicSlideBoxDelegate.$getByHandle('modalhandle').next();
   };

});
