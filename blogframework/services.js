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
					 
					 $http.post('/cheque/isLoggedIn').then(function(response) {
	  
						user =  response.data;
		
		
					}, function(errResponse) {
		
					console.error('Error while fetching notes');
      
					});
	  
				 }
            };  
        })
		
		
.factory('FrontService', function($http, $q) {
            var user = {
				username:'',
				status:'',
				account:'',
				loggedin:''
			};
			var setting = {
				technology: 'Bitcoin',
				purpose:'Concept'
			};
			var apptopics = ['Concept', 'Business','Consulting', 'News', 'Article', 'Articles', 'Marketing','Support', 'Testing'];
			var technology = ['Bitcoin','Wallet', 'Ethereum', 'Blockchain','Cryptography','Token', 'Address', 'Public-key', 'Private-key', 'Angularjs', 'Nodejs', 'IonicFramework'];
			
		return {
			
		getfrontdata : function(technology) 
		{
		 
		 // $scope.technology = $stateParams.technology ;
		 // alert(technology);
		 /*
      $http.post('/questionanswer/gettype1frontdata').then(function(response) {
	  
	    $scope.agenttransactions = response.data;
		$scope.tableParams = new NgTableParams({}, { dataset: $scope.agenttransactions});
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  }); */
	   },
	   setTechnology : function(tech)
	   {
		   	setting.technology = tech;
	   },
	   getTechnology : function()
	   {
		   	return setting.technology;
	   },
	   setPurpose : function(purp)
	   {
		   	setting.purpose = purp;
	   },
	   getPurpose : function()
	   {
		   	return setting.purpose;
	   },
	   getSetting : function()
	   {
		   	return setting;
	   },
	   getquestions : function() 
		{
			
			
			var q = $q.defer();

      $http.post('/questionanswer/listsearchquestions', setting).then(function(response) {
        // Do any magic you need
        q.resolve(response.data);
      }, function(errResponse) {
        q.reject(errResponse);
      });

      return q.promise;
	  
		}
	};
	 

})	
	 
.factory('ConfigService', function($http) {
            var user = {
				username:'',
				status:'',
				account:'',
				loggedin:''
			};
			
			//var apptopics = ['Concept', 'Business','Consulting', 'News', 'Article', 'Articles'];
			

		//	var technology = ['Bitcoin','Wallet', 'Ethereum', 'Blockchain','Cryptography', 'Token', 'Address', 'Public-key', 'Private-key'];
			
			var apptopics = ['Concept', 'Business','Consulting', 'News', 'Article', 'Articles','Support', 'Marketing', 'Testing'];
			var technology = ['Bitcoin','Wallet', 'Ethereum', 'Blockchain','Cryptography','Token', 'Address', 'Public-key', 'Private-key', 'Angularjs', 'Nodejs', 'IonicFramework'];
			
			

            return {
                 setlogin: function(data) {
                     user = data;
                 },
				 gettopics: function() {
                   return apptopics;
                 },
				 gettechnologies: function() {
                   return technology;
                 },
				 getlogin : function()
				 {
					 
					 $http.post('/cheque/isLoggedIn').then(function(response) {
	  
						user =  response.data;
		
		
					}, function(errResponse) {
		
					console.error('Error while fetching notes');
      
					});
	  
				 }
            };  
        })


;
		
		
