var app = angular.module('starter', [
  'ionic',
  'satellizer',
  'ionic-letter-avatar',
  'stpa.modal',
  'ui.bootstrap'
]);

//var api_url='http://localhost:9998';
var api_url=  'http://a2e6f8d8.ngrok.io'   
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$authProvider) {
  $authProvider.loginUrl = api_url + '/user/login';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = '';
    $authProvider.storageType = 'localStorage';

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/view-login.html',
      controller: 'loginController'
    })

  .state('main', {
    abstract: true,

      templateUrl: 'templates/side_menu/view_side_menu.html',
      controller: 'homeCtrl'

  })


  .state('main.home', {
    url: '/home',
    views: {
      'content': {
        templateUrl: 'templates/home/view-home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('main.edit', {
      url: '/:id/edit',
      views: {
        'content': {
          templateUrl: 'templates/note/view_note.html',
          controller: 'noteCtrl'
        }
      }
    })
    .state('main.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'content': {
          templateUrl: '',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('main.account', {
    url: '/account',
    views: {
      'content': {
        templateUrl: '',
        controller: 'AccountCtrl'
      }
    }
  });

  var url = window.location.hash.split("/");
    if (url[0] === "") {
        if (localStorage.token === undefined) {
            $urlRouterProvider.otherwise('/login');
        } else {

            $urlRouterProvider.otherwise('/home');
        }
    } else {
        $urlRouterProvider.otherwise('/login');
    }

})
.run(["$rootScope", "$auth", "$state", function($rootScope, $auth, $state) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {

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

                    if (user.name.length > 3 && user.program.length > 3 && user.id.length > 2) {
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

}]);
