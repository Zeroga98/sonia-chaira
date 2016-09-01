app.factory('loginService', function ($http) {

return {
	login: function(user) {
      return $http.post(api_url + "/user/login",user);
    }
}


});
