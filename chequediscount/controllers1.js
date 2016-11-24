angular.module('myapp.controllers1', ["ngTable"])


.controller('DiscounterCtrl', function($scope, $http, NgTableParams, LoginService ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});


$scope.entereddiscount = 5;
$scope.enteredrating = 5;
$scope.loggedinuser = '';

$scope.loginstatus = {
		   username:'',
				status:'',
				account:'',
				loggedin:''
	   };

	LoginService.getlogin();
	$scope.refreshmarket = function()
	 {
		 $scope.loginstatus = LoginService.getloginstatus();
		
			$scope.getactivetransactions();
	 }
	 $scope.getactivetransactions = function() 
	 {
      $http.get('/cheque/getactivetransactions').then(function(response) {
	  
	    $scope.agenttransactions = response.data;
		$scope.tableParams = new NgTableParams({}, { dataset: $scope.agenttransactions});
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }

	 $scope.setdisco = function ()
	 {
		 $scope.selectedtransaction.discount = $scope.entereddiscount;
		 
		 $scope.sendingdiscount = {
			recordid : $scope.selectedtransaction._id,
			discount: $scope.entereddiscount
		 };
		 
		 if($scope.entereddiscount > $scope.selectedtransaction.maxdiscount)
		 {
				alert ('Discount has to be below : '+ $scope.selectedtransaction.maxdiscount)
				return;
		 }
		 
		 $http.post('/cheque/setdiscount', $scope.sendingdiscount).then(function(response) {
	  
	  alert('submit success');
		
      }, function(errResponse) {
		
		 alert('submit failed'+ errResponse.data.reason);

        console.error('Error while fetching notes');
      
	  });
		 
		// alert ($scope.entereddiscount)	;
	 }
	 $scope.setrating = function ()
	 {
		 
		 
		 $scope.sendingrating = {
			recordid : $scope.selectedtransaction._id,
			rating: $scope.enteredrating,
			ratingmessage: $scope.enteredratingmessage
		 };
		 
		 $http.post('/cheque/setissuerrating', $scope.sendingrating).then(function(response) {
	  
	  alert('submit success');
		
      }, function(errResponse) {
		
		 alert('submit failed'+ errResponse.data.reason);

        console.error('Error while fetching notes');
      
	  });
		// alert ($scope.entereddiscount)	;
	 }
     $scope.enterdiscount	= function(id) 
	 {
		 for(var i=0;i< $scope.agenttransactions.length; i++){
			 if($scope.agenttransactions[i]._id == id)
			 {
				 $scope.selectedtransaction = $scope.agenttransactions[i];
				 break;
			 }
		 }
		 
	   //alert (id)	;
	 }
	
	$scope.enterrating	= function(id) 
	{
	
	
		for(var i=0;i< $scope.agenttransactions.length; i++){
			 if($scope.agenttransactions[i]._id == id)
			 {
				 $scope.selectedtransaction = $scope.agenttransactions[i];
				 break;
			 }
		 }
	}
	$scope.refreshmarket();
	

})

.controller('AgentCtrl', function($scope, $http, NgTableParams, LoginService ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});

$scope.receiver = {
	username: '',
	account:'receiver',
	resaddress:'',
	aggrement:'',
	etherrec :{}
};
$scope.issuer = {
	username: '',
	account:'issuer',
	resaddress:'',
	aggrement:'' ,
	collateral:'',
	issuerlimit:'',
	exposure:'',
	rating:'',
	etherrec :{}
};

var	cheque = {
			issuer:'',			// username
			receiver:'',		// username
			agent:'',			// username
			chequeid:'',	
			chequeaccount:'',
			cashingdate:'',
			issuedate:'',
			amount:'',
			issuerlimit:'',
			issuerrating:'',
			ratingmessage:'',
			discounter:'' ,		// username
			discount:'',
			maxdiscount :'',
			traded :'', 	// pending, cancelled, done
			rated: 'no', 	// yes, no
			etherupdated : '',
			
			
		   
		} ;
	LoginService.getlogin();	
  
   $scope.refresh = function ()
   {
	   $scope.getissuers();
	   $scope.getreceivers();
   }

   $scope.getissuers = function() 
	 {
      $http.get('/cheque/getissuers').then(function(response) {
	  
	    $scope.issuers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }
    $scope.getreceivers = function() 
	 {
      $http.get('/cheque/getreceivers').then(function(response) {
	  
	    $scope.receivers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 } 
	 
	 $scope.submitreceiver = function() 
	 {
      $http.post('/cheque/createreceiver', $scope.receiver).then(function(response) {
	  
	  alert('submit success');
		
      }, function(errResponse) {
		
		alert('submit failed');

        console.error('Error while fetching notes');
      
	  });
	 }
	 $scope.submitissuer = function() 
	 {
      $http.post('/cheque/createissuer', $scope.issuer).then(function(response) {
	  
	  alert('submit success');
		
      }, function(errResponse) {
		
		alert('submit failed');

        console.error('Error while fetching notes');
      
	  });
	 }



	 $scope.submitcheque = function() 
	 {
      $http.post('/cheque/chequedeposit', $scope.cheque).then(function(response) {
	  
	  alert('cheque submit success');
	  $scope.cheque = {};
		
      }, function(errResponse) {
		
		alert('check submit failed:'+errResponse.data.reason);

        console.error('Error while fetching notes');
      
	  });
	 }
	 $scope.refreshmarket = function()
	 {
			$scope.getactivetransactions();
	 }
	 $scope.getactivetransactions = function() 
	 {
      $http.get('/cheque/getactivetransactions').then(function(response) {
	  
	    $scope.agenttransactions = response.data;
		$scope.tableParams = new NgTableParams({}, { dataset: $scope.agenttransactions});
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 } 
	
	$scope.refreshmarket(); 
	$scope.refresh(); 


})


.controller('ReceiverCtrl', function($scope, $http, NgTableParams, LoginService ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});

LoginService.getlogin();

	$scope.refreshmarket = function()
	 {
		 $scope.loginstatus = LoginService.getloginstatus();
		
			$scope.getactivetransactions();
	 }
	 $scope.getactivetransactions = function() 
	 {
      $http.get('/cheque/getactivetransactions').then(function(response) {
	  
	    $scope.agenttransactions = response.data;
		$scope.tableParams = new NgTableParams({}, { dataset: $scope.agenttransactions});
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }
	 $scope.refresh = function ()
   {
	   $scope.getissuers();
	   $scope.getreceivers();
   }

   $scope.getissuers = function() 
	 {
      $http.get('/cheque/getissuers').then(function(response) {
	  
	    $scope.issuers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }
    $scope.getreceivers = function() 
	 {
      $http.get('/cheque/getreceivers').then(function(response) {
	  
	    $scope.receivers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 } 
	
$scope.refresh();
$scope.refreshmarket();

})

.controller('IssuerCtrl', function($scope, $http, NgTableParams, LoginService ) {
	
var self = this;
var data1 = [{name: "Moroni", age: 50} ,
{name: "Moroni", age: 50}

/*,*/];

var data = [{issuer: "Moroni", amount: 50, reputation:80, discount: 10, exposure: 30, limit: 10000, discounter: "Disco1" } ,
{issuer: "Moroni", amount: 50, reputation:80, discount: 20, exposure: 30, limit: 10000, discounter: "Disco2" } 

/*,*/];
$scope.tableParams = new NgTableParams({}, { dataset: data});

LoginService.getlogin();
	$scope.refreshmarket = function()
	 {
		 $scope.loginstatus = LoginService.getloginstatus();
		
			$scope.getactivetransactions();
	 }
	 $scope.getactivetransactions = function() 
	 {
      $http.get('/cheque/getactivetransactions').then(function(response) {
	  
	    $scope.agenttransactions = response.data;
		$scope.tableParams = new NgTableParams({}, { dataset: $scope.agenttransactions});
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }
$scope.refresh = function ()
   {
	   $scope.getissuers();
	   $scope.getreceivers();
   }

   $scope.getissuers = function() 
	 {
      $http.get('/cheque/getissuers').then(function(response) {
	  
	    $scope.issuers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 }
    $scope.getreceivers = function() 
	 {
      $http.get('/cheque/getreceivers').then(function(response) {
	  
	    $scope.receivers = response.data;
		
      }, function(errResponse) {
		
        console.error('Error while fetching notes');
      
	  });
	 } 
	
$scope.refresh();
$scope.refreshmarket();
})




;


   
	
