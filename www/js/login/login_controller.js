app.controller('loginController', function($scope, $location, $auth, $rootScope,$ionicHistory,$state,$interval) {

  $scope.user = {
    user: "",
    password: ""
  };
// $cordovaStatusbar.styleHex('#15db0b');
   $rootScope.help=function(){

      return true;

  };
  var repit = false;
  $scope.loading = false;
  $scope.login = function(user) {
    $scope.loadingSw(15);
    if (!repit && $scope.valid()) {
      repit = true;
      $scope.loading = true;

      $rootScope.loadingState = false;




      $auth.login(user).then(function(data) {
        $scope.loading = false;
        //guardar en localStorage el data.data.token
        //base de datos local data.data.data
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("Data", JSON.stringify(data.data.data));
        //JSON.parse(localStorage.getItem("token"));
        //localStorage.removeItem("token");
        //localStorage.clear();
        // if(data.satus==200; )esle (por puto data.data)

              $rootScope.loadingState = true;
        $ionicHistory.clearCache().then(function(){ $state.go('main.home');});
      //  $location.path("/home");
        repit = false;
      }).catch(function(error) {
        $scope.loading = false;
        repit = false;
        $rootScope.loadingState = false;

        if (error.data!=null) {
        swal({   title: "Fallo!",   text: error.data,   timer: 2000,   showConfirmButton: false });
      }else{
        swal({   title: "Fallo!",   text: "Error de conexión",   timer: 2000,   showConfirmButton: false });
      }

        //se valida si se fue el internet
      })

    }
  }

  $scope.valid = function() {
    return ($scope.user.user.length > 3 && $scope.user.password.length > 3);
  }
  $scope.loadingSw = function(time) {
     var varnew;
     var acum = 0;
      $rootScope.loadingState = true;
      varnew = $interval(function() {
          acum++;
          if (acum == time || !$rootScope.loadingState) {
              $interval.cancel(varnew);
              if (acum == time) {
             //     $rootScope.messageNotification("Tu conexión a internet es muy lenta");
          /*    swal({   title: "Fallo!",
                 text: "No se pudo contactar con el servidor",
                 timer: 2000,
                 showConfirmButton: false });*/

    //swal("Deleted!", "Your imaginary file has been deleted.", "success");
        swal("Fallo!", "Conexion fallida", "error");
             console.log("lento");
              }
              acum = 0;
              $rootScope.loadingState = false;
          } else {
              if ($rootScope.loadingState != false) {
                  $rootScope.loadingState = true;
              }
          }
      }, 1000);
  }

});
