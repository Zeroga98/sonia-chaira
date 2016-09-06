var app = angular.module('starter', [
  'ionic',
  'satellizer',
  'ionic-letter-avatar',
  'stpa.modal',
  'ui.bootstrap',
  'ngCordova'

]);
//var api_url='http://localhost:9998';
var api_url= 'http://b259f093.ngrok.io';
// var api_url='http://200.21.7.94:9998';

  var config = {
    apiKey: "AIzaSyAjvhTGk9wnmQ9kNzILdCzusyZIBF4r7wE",
    authDomain: "tremolo-b2484.firebaseapp.com",
    databaseURL: "https://tremolo-b2484.firebaseio.com",
    storageBucket: "tremolo-b2484.appspot.com",
  };

try {
    firebase.initializeApp(config);
    var fireDB = firebase.database();
} catch (er) {
  console.log(er);
    if(fireDB != undefined){
        fireDB.ref("disconnectmessage").onDisconnect().set("I disconnected!");
    }
}

app.run(['$ionicPlatform', function($ionicPlatform,$cordovaPlugin,$rootScope) {
  
 

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }




      if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#387ef5");
    }
  });
}])


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
