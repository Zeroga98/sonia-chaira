var app = angular.module('starter', [
  'ionic',
  'satellizer',
  'ionic-letter-avatar',
  'stpa.modal',
  'ui.bootstrap'
]);

var api_url='http://localhost:9998';

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
    templateUrl: 'templates/side_menu/view_side_menu.html'
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
      url: '/edit:id',
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

  $urlRouterProvider.otherwise('/login');

});
