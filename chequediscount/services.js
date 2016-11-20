angular.module('myapp.services', [])

.factory('UsersService', function($http) {
            var result = [];

            return {
                 getusers: function() {
                     return $http.get('http://localhost:4730/readyapp/users/teama');
                 },
				 send: function(sentobj) {
                     var responsePromise = $http.post("http://localhost:4730/readyapp/senduser", sentobj, {});
       
					return responsePromise;
                 }
            };  
        })
		
.factory('NewsService', function($http) {
            var result = [];

            return {
                 getnews: function() {
                     return $http.get('http://localhost:4730/readyapp/news/teama');
                 },
				 send: function(sentobj) {
                     var responsePromise = $http.post("http://localhost:4730/readyapp/sendnews", sentobj, {});
       
					return responsePromise;
                 }
            };  
        })
		
 .factory('QuestionService', function($http) {
            var result = [];

            return {
                 getquestions: function() {
                     return $http.get('http://localhost:4730/readyapp/questions/teama');
                 },
				 send: function(sentobj) {
                     var responsePromise = $http.post("http://localhost:4730/readyapp/sendquestion", sentobj, {});
       
					return responsePromise;
                 }
            };  
        });
		
		
