app.controller('loginController', function($scope, $location, $auth, $rootScope) {
  $scope.user = {
    user: "",
    password: ""
  };
  var repit = false;
  $scope.loading = false;
  $scope.login = function(user) {
    if (!repit && $scope.valid()) {
      repit = true;
      $scope.loading = true;
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


          $rootScope.data = JSON.parse(localStorage.getItem("Data"));
          $rootScope.semana();
        
        console.log(data.data.data);
        $location.path("/home");
        repit = false;
      }).catch(function(error) {
        $scope.loading = false;
        repit = false;
        //se valida si se fue el internet
      })

    }
  }

  $scope.valid = function() {
    return ($scope.user.user.length > 3 && $scope.user.password.length > 3);
  }
});