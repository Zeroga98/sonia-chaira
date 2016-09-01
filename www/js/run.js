app.run(["$rootScope", "$auth", "$state", function($rootScope, $auth, $state) {

  /*  $rootScope.$on('$stateChangeStart', function(event, toState) {

        if (toState.name === "login") {
            if ($auth.isAuthenticated() && $auth.getPayload() !== undefined && $auth.getPayload().name.length > 3) {
                event.preventDefault();
                $state.go('main.home');
            }
        } else { // Cuando esta dentro de la app

            if (!$auth.isAuthenticated()) { //No existe un token el localStorage
                event.preventDefault();
                $state.go('login');
            } else {
                if ($auth.getPayload() !== undefined) {

                    var user = $auth.getPayload();

                    if (user.name.length > 3 && user.program.length > 3 && user.user.length > 2) {
                        //Todo esta bien

                    } else {
                        event.preventDefault();
                        $state.go('login');
                    }
                } else { // cuando el token no existe
                    $rootScope.user = undefined;
                    event.preventDefault();
                    $state.go('login');
                }

            }
        }
    });
*/
}]);
