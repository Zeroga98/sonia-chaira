app.run(["$rootScope", "$auth", "$state", function($rootScope, $auth, $state) {

  if (ionic.Platform.isAndroid()) {
        StatusBar.backgroundColorByHexString("#608628");
      }
}]);
