angular.module('myapp.controllers2', ['chart.js'])

.controller('LoginRegistrationCtrl', function($rootScope, $scope,$location, $http,$state, LoginService) {
	   
	   $scope.login = {
		 username: '',
		 password:''
	   };
	 
	  $scope.register = {
		 username: '',
		 password:'',
		 verify:'',
		 email:'',
		 account: ''
	   };
	   
	   $scope.purpose = ['discounter', 'agent', 'receiver', 'issuer'];
	   $scope.loginstatus = {
		   username:'',
				status:'',
				account:'',
				loggedin:''
	   };
	   
	 $scope.loginerror = '';
	 
	 $rootScope.$on('$stateChangeSuccess', 
	 function(event, toState, toParams, fromState, fromParams){ 
	
    
		$scope.refresh();
	
	 });
	LoginService.getlogin();	
	 $scope.refresh = function() 
	 {
  
		$scope.loginstatus = LoginService.getloginstatus();
  
	 }



	  
	 
	 $scope.login1 = function() 
	 {
      $http.post('/questionanswer/handleLoginRequest', $scope.login).then(function(response) {
	  

		$scope.loggedin = true;
		LoginService.setlogin({username:$scope.login.username, status:'active', account: response.data.account, loggedin:true});
		$scope.loginstatus = LoginService.getloginstatus();
		$location.path('#/front/Bitcoin');	
		
		if($scope.loginstatus.account == 'issuer'){
		//	$state.go('questionanswerissuer');	
		}else if($scope.loginstatus.account == 'discounter'){
		//	$state.go('questionanswerdiscounter');	
		}else if($scope.loginstatus.account == 'receiver'){
		//	$state.go('questionanswerreceiver');	
		}else {
		//	$state.go('questionansweragent');
		}
		   
		
		
      }, function(errResponse) {
		

		$scope.loggedin = false;
		
		$scope.loginerror = errResponse.data.login_error;
        console.error('Error while fetching notes');
      
	  });
	 }
	 
	 $scope.logout = function() 
	 {
      $http.post('/questionanswer/adminLogout').then(function(response) {
	  
		LoginService.setlogin(null);
		$scope.loggedin = false;
		$scope.loginstatus = LoginService.getloginstatus();
      }, function(errResponse) {
		


        console.error('Error while fetching notes');
      
	  });
	 }
	 
	 
	 $scope.checklogin1 = function() 
	 {
		 //LoginService.user;
		 alert(angular.toJson(LoginService.getloginstatus()));
	 }

	 
	 $scope.register1 = function() 
	 {
	  if($scope.register.username == '' || $scope.register.password =='')
	  {
		  alert ('Enter username password');
		  return;
	  }
      $http.post('/questionanswer/adminregister', $scope.register).then(function(response) {
	  
        LoginService.setlogin({username:$scope.login.username, status:'active', account: response.data.account, loggedin:true});
		
		$scope.loggedin = true;
		$scope.loginstatus = LoginService.getloginstatus();
		$location.path('#/front/Bitcoin');	
		/*
		if($scope.loginstatus.account == 'issuer'){
			$state.go('questionanswerissuer');	
		}else if($scope.loginstatus.account == 'discounter'){
			$state.go('questionanswerdiscounter');	
		}else if($scope.loginstatus.account == 'receiver'){
			$state.go('questionanswerreceiver');	
		}else {
			$state.go('questionansweragent');
		}
		
		*/
		
      }, function(errResponse) {
		  
        console.error('Error while fetching notes');
      
	  });
	 }
	 $scope.refresh();
	 
	   
   })
   

   
.controller('TestCtrl', function($scope, $http) {
})

     
;
   
	
