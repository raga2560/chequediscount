angular.module('myapp.services', [])

.factory('LoginService', function($http) {
            var user = {
				username:'',
				status:'',
				account:'',
				loggedin:''
			};

            return {
                 setlogin: function(data) {
                     user = data;
                 },
				 getloginstatus: function() {
                   return user;
                 },
				 getlogin : function()
				 {
					 
					 $http.get('/cheque/isLoggedIn').then(function(response) {
	  
						user =  response.data;
		
		
					}, function(errResponse) {
		
					console.error('Error while fetching notes');
      
					});
	  
				 }
            };  
        })

;
		
		
