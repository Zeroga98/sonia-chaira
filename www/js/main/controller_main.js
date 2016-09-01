app.controller('mainCtrl', function($scope, $auth, $location, $state, $rootScope) {


		$scope.confirmToken = function(res){
      		if (res != undefined && res.message == "El token no es valido") {
      			 event.preventDefault();
           		 $state.go('userMain.login');
      		}
      	}

      	$scope.errorConexion = function(){
      		if ($auth.getPayload()== undefined) {
              $scope.conexion = "Error al conectarse con el servidor";
            }
      	}

      	$scope.logout = function(){
      		$auth.logout();
      	}
})
